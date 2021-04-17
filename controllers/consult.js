const { response, request } = require("express");
const { Base64 } = require("js-base64");
const fetch = require("node-fetch");
const lodash = require("lodash");
const { v4: uuidv4 } = require("uuid");

const prefixs = `
        PREFIX ecrm: <http://erlangen-crm.org/170309/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX time: <http://www.w3.org/2006/time#>
        PREFIX : <http://curiocity.org/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      `;

const auth = Base64.encode("admin:curiocity@2021");

const consult = (req, res = response) => {
  const { author, material, place, title, period } = req.body;
  console.log(place);
  // Query por el momento cableada
  const query = `${prefixs} SELECT ?labelArtifact ?labelMaterial ?labelKeeper ?labelCreator ?id ?period_l
  WHERE {
    ?prod ecrm:P108_has_produced ?artifact ;
        ecrm:P14_carried_out_by ?creator .

    ?artifact rdfs:label ?labelArtifact ;
              ecrm:P45_consists_of ?material ;
              ecrm:P50_has_current_keeper ?keeper ;
              ecrm:P48_has_preferred_identifier ?idCode .

    OPTIONAL {
    ?prod ecrm:P4_has_time-span ?timespan .
    ?period a ecrm:E4_Period ;
        ecrm:P4_has_time-span ?timespan ;
        rdfs:label ?period_l .
    }
      
    ?idCode rdfs:label ?id .          
    ?material rdfs:label ?labelMaterial .
    ?keeper rdfs:label ?labelKeeper .
    OPTIONAL {?creator rdfs:label ?labelCreator .}
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
      console.log(result);
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
  console.log(id);
  const query = `${prefixs} SELECT ?artifactLabel ?note ?artifactLabel ?materialLabel ?keeperLabel ?authorLabel ?id ?period_l ?locationLabel
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
  	?author rdfs:label ?authorLabel .
    }
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

  const query = `${prefixs} SELECT ?labelArtifact ?labelMaterial ?labelKeeper ?labelCreator ?note ?id ?labelLocation
  WHERE {
    ?prod ecrm:P108_has_produced ?artifact ;
          ecrm:P14_carried_out_by ?creator .
    ?artifact rdfs:label ?labelArtifact ;
              ecrm:P45_consists_of ?material ;
              ecrm:P3_has_note ?note ;
              ecrm:P50_has_current_keeper ?keeper ;
              ecrm:P55_has_current_location ?location ;
              ecrm:P48_has_preferred_identifier ?idCode .
      
    ?idCode rdfs:label ?id .          
    ?material rdfs:label ?labelMaterial .
    ?location rdfs:label ?labelLocation .
    ?keeper rdfs:label ${label} .
    OPTIONAL {?creator rdfs:label ?labelCreator .}
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
      const result = resp.results.bindings.map((art) => {
        let newObj = {};
        Object.keys(art).forEach((key) => (newObj[key] = art[key].value));
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

const createArtifact = (req, res = response) => {
  const { title, author, material, location, description } = req.body;
  const id = uuidv4();

  const authorUrl = encodeURIComponent(author);

  const update = `${prefixs} INSERT DATA {
      :${id} rdf:type ecrm:E42_Identifier ;
              rdfs:label "${id}" .
      <http://curiocity.org/${id}/Material> rdf:type ecrm:E57_Material ;
                                             rdfs:label "${material}" .
      <http://curiocity.org/${id}/Object> rdf:type ecrm:E22_Man-Made_Object ;
                                           ecrm:P48_has_preferred_identifier :${id} ;
                                           ecrm:P45_consists_of <http://curiocity.org/${id}/Material> ;
                                           ecrm:P50_has_current_keeper <${location}>;
                                           rdfs:label "${title}" ;
                                           ecrm:P3_has_note "${description}" .

      :${authorUrl} rdfs:label "${author}" .
      <http://curiocity.org/${id}/Production> rdf:type ecrm:E12_Production ;
                                               ecrm:P14_carried_out_by :${authorUrl};
                                               ecrm:P108_has_produced <http://curiocity.org/${id}/Object> .

  }
  `;

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
    .then((resp) =>
      res.json({
        ok: true,
      })
    )
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
};
