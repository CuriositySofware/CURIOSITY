const { response, request, json } = require("express");
const { Base64 } = require("js-base64");
const fetch = require("node-fetch");
const lodash = require("lodash");

const { userData } = require("./users/utils");
const { createArtifactUtil } = require("./utils");

const prefixs = `
        PREFIX ecrm: <http://erlangen-crm.org/170309/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX time: <http://www.w3.org/2006/time#>
        PREFIX : <http://curiocity.org/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      `;

const auth = Base64.encode("admin:curiocity@2021");

const consult = (req, res = response) => {
  const {
    author,
    material,
    place,
    title,
    period,
    status = "Verified",
  } = req.body;

  // Query por el momento cableada
  const query = `${prefixs} SELECT ?labelArtifact ?labelMaterial ?labelKeeper ?labelCreator ?id ?period_l ?note ?keeper
  WHERE {
    ?prod ecrm:P108_has_produced ?artifact ;
        ecrm:P14_carried_out_by ?creator .

    ?artifact rdfs:label ?labelArtifact ;
              ecrm:P45_consists_of ?material ;
              ecrm:P50_has_current_keeper ?keeper ;
              ecrm:P48_has_preferred_identifier ?idCode ;
              ecrm:P3_has_note ?note ;
              ecrm:P2_has_type :${status} .

    OPTIONAL {
    ?prod ecrm:P4_has_time-span ?timespan .
    ?period a ecrm:E4_Period ;
        ecrm:P4_has_time-span ?timespan ;
        rdfs:label ?period_l .
    }

    OPTIONAL{?process :L1_digitized ?artifact ;
      :L20_has_created/:T2_has_file_name ?filename .}
      
    ?idCode rdfs:label ?id .          
    ?material rdfs:label ?labelMaterial .
    ?keeper rdfs:label ?labelKeeper .
    OPTIONAL {?creator rdfs:label ?labelCreator } .
    ${
      author
        ? `FILTER( regex(lcase(?labelCreator), "${author.toLowerCase()}" )) .`
        : ""
    }       
    ${
      material
        ? `FILTER( regex(lcase(?labelMaterial), "${material.toLowerCase()}" )) .`
        : ""
    }
    ${
      title
        ? `FILTER( regex(lcase(?labelArtifact), "${title.toLowerCase()}" )) .`
        : ""
    }
    ${
      place
        ? `FILTER( regex(lcase(?labelKeeper), "${place.toLowerCase()}" )) .`
        : ""
    }
    ${
      period
        ? `FILTER( regex(lcase(?period_l), "${period.toLowerCase()}" )) .`
        : ""
    }
    
  }`;

  // Aca se envia la consulta a Jena(por ahora en local)
  fetch(`${process.env.URL_JENA}/sparql`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      accept: "application/sparql-results+json",
    },
    body: new URLSearchParams({
      query,
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      const result = resp.results.bindings;
      // Respuesta a la consulta
      res.json({
        ok: true,
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        ok: false,
        err,
      });
    });
};

const getArtifactById = (req = request, res = response) => {
  const { id } = req.params;
  const query = `${prefixs} SELECT ?artifactLabel ?note ?artifactLabel ?materialLabel ?keeperLabel ?authorLabel ?id ?period_l ?locationLabel ?filename
  WHERE {
    ?artifact a ecrm:E22_Man-Made_Object ;
        ecrm:P48_has_preferred_identifier ?idCode ;
    		ecrm:P3_has_note ?note ;
    		rdfs:label ?artifactLabel ;
      	ecrm:P50_has_current_keeper ?keeper ;
    		ecrm:P45_consists_of ?material .
    
    ?material rdfs:label ?materialLabel .
    ?keeper rdfs:label ?keeperLabel .
    ?idCode rdfs:label "${id}" . 
  	?prod ecrm:P108_has_produced ?artifact ;
         ecrm:P14_carried_out_by ?author .

    OPTIONAL {
    ?prod ecrm:P4_has_time-span ?timespan .
    ?period a ecrm:E4_Period ;
        ecrm:P4_has_time-span ?timespan ;
        rdfs:label ?period_l .
    ?artifact ecrm:P55_has_current_location ?location .
    ?location rdfs:label ?locationLabel .
    }

    OPTIONAL {?author rdfs:label ?authorLabel .}

    OPTIONAL{?process :L1_digitized ?artifact ;
      :L20_has_created/:T2_has_file_name ?filename .}
  	
  }`;

  fetch(`${process.env.URL_JENA}/sparql`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      accept: "application/sparql-results+json",
    },
    body: new URLSearchParams({
      query,
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      const result = resp.results.bindings;
      // Respuesta a la consulta
      res.json({
        ok: true,
        result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        ok: false,
        err,
      });
    });
};

const getMuseums = (req, res = response) => {
  const query = `${prefixs}SELECT DISTINCT ?labelMuseum ?labelLocation ?museum {
    ?artifact ecrm:P50_has_current_keeper ?museum ;
              ecrm:P55_has_current_location ?location .
    ?location rdfs:label ?labelLocation .
    ?museum rdfs:label ?labelMuseum .
    
}`;

  fetch(`${process.env.URL_JENA}/sparql`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      accept: "application/sparql-results+json",
    },
    body: new URLSearchParams({
      query,
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      const format = resp.results.bindings.map((museum) => {
        let newObj = {};
        Object.keys(museum).forEach((key) => (newObj[key] = museum[key].value));
        return newObj;
      });

      const groupBymuseum = lodash.groupBy(format, "labelMuseum");

      const getRooms = (museum_arr) => {
        let rooms = [];
        museum_arr.forEach((elem) => rooms.push(elem["labelLocation"]));
        return rooms;
      };

      Object.keys(groupBymuseum).forEach(
        (key) =>
          (groupBymuseum[key] = {
            museum: groupBymuseum[key][0]["museum"],
            label: groupBymuseum[key][0]["labelMuseum"],
            rooms: getRooms(groupBymuseum[key]),
          })
      );

      // Respuesta a la consulta
      res.json({
        ok: true,
        result: Object.values(groupBymuseum),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        ok: false,
        err,
      });
    });
};

const getArtifactByMuseum = (req, res = response) => {
  const { label } = req.query;
  if (!label)
    return res
      .status(404)
      .json({ ok: false, err: 'query param "label" is missing.' });

  const query = `${prefixs} SELECT ?labelArtifact ?labelMaterial ?labelKeeper ?labelCreator ?note ?id ?labelLocation ?filename
  WHERE {
    ?prod ecrm:P108_has_produced ?artifact ;
          ecrm:P14_carried_out_by ?creator .
    ?artifact rdfs:label ?labelArtifact ;
              ecrm:P45_consists_of ?material ;
              ecrm:P3_has_note ?note ;
              ecrm:P50_has_current_keeper ?keeper ;
              ecrm:P55_has_current_location ?location ;
              ecrm:P48_has_preferred_identifier ?idCode ;
              ecrm:P2_has_type :Verified .
    
    OPTIONAL{?process :L1_digitized ?artifact ;
        :L20_has_created/:T2_has_file_name ?filename .}
      
    ?idCode rdfs:label ?id .          
    ?material rdfs:label ?labelMaterial .
    ?location rdfs:label ?labelLocation .
    ?keeper rdfs:label ${label} .
    OPTIONAL {?creator rdfs:label ?labelCreator } .
  }
    `;

  fetch(`${process.env.URL_JENA}/sparql`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      accept: "application/sparql-results+json",
    },
    body: new URLSearchParams({
      query,
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      let result = resp.results.bindings.map((art) => {
        let newObj = {};
        Object.keys(art).forEach((key) => (newObj[key] = art[key].value));

        if (!newObj.labelCreator) {
          newObj["labelCreator"] = "Desconocido";
        }
        return newObj;
      });

      // Respuesta a la consulta
      res.json({
        ok: true,
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        ok: false,
        err,
      });
    });
};

const createArtifact = async (req, res = response) => {
  const userInfo = await userData(req.user);
  if (!userInfo.ok) {
    return res.status(500).json({
      ok: false,
      message: userInfo.message,
    });
  }
  const type = userInfo.type === "admin" ? "Verified" : "Unverified";
  const result = await createArtifactUtil({ ...req.body, type });
  res.json(result);
};

const updateArtifact = async (req, res) => {
  const { id } = req.params;

  const { action, info, newInfo } = req.body;

  if (!info || !newInfo) {
    return res.status(400).json({
      ok: false,
      message: "application info is required",
    });
  }

  const userInfo = await userData(req.user);
  if (!userInfo.ok) {
    return res.status(500).json({
      ok: false,
      message: userInfo.message,
    });
  }
  if (userInfo.type !== "admin") {
    return res.status(401).json({
      ok: false,
      message: "El usuario no tiene privilegios para aprobar obras",
    });
  }

  const material = info.labelMaterial.value;
  const location = info.keeper.value;
  const title = info.labelArtifact.value;
  const description = info.note.value;
  const author = info.labelCreator.value;
  const authorUrl = encodeURIComponent(author);

  let update = prefixs;
  if (action === "approved" || action === "declined") {
    update += `
      DELETE WHERE{
              :${id} rdf:type ecrm:E42_Identifier ;
              rdfs:label "${id}" .
      <http://curiocity.org/${id}/Material> rdf:type ecrm:E57_Material ;
                                             rdfs:label "${material}" .
      <http://curiocity.org/${id}/Object> rdf:type ecrm:E22_Man-Made_Object ;
                                           ecrm:P48_has_preferred_identifier :${id} ;
                                           ecrm:P45_consists_of <http://curiocity.org/${id}/Material> ;
                                           ecrm:P50_has_current_keeper <${location}>;
                                           rdfs:label "${title}" ;
                                           ecrm:P3_has_note "${description}" ;
                                           ecrm:P2_has_type :Unverified .

      <http://curiocity.org/${id}/Production> rdf:type ecrm:E12_Production ;
                                               ecrm:P14_carried_out_by :${authorUrl};
                                               ecrm:P108_has_produced <http://curiocity.org/${id}/Object> .
      }
    `;
  } else {
    return res.status(400).json({
      ok: false,
      message: 'action type unhandled must be "approved" or "declined"',
    });
  }

  fetch(`${process.env.URL_JENA}/update`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      accept: "application/sparql-results+json",
      Authorization: `Basic ${auth}`,
    },
    body: new URLSearchParams({
      update,
    }),
  })
    .then(async (resp) => {
      if (action === "approved") {
        const result = await createArtifactUtil({ ...newInfo, type: "Verified", prevId: id });
        return res.json(result);
      }
      return res.json({
        ok: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        ok: false,
        err,
      });
    });
};

module.exports = {
  consult,
  getArtifactById,
  getMuseums,
  getArtifactByMuseum,
  createArtifact,
  updateArtifact,
  prefixs,
};
