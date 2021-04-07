const { response, request } = require("express");
const { Base64 } = require("js-base64");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");

const prefixs = `
        PREFIX ecrm: <http://erlangen-crm.org/170309/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX time: <http://www.w3.org/2006/time#>
        PREFIX : <http://curiocity.org/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      `;

const auth = Base64.encode("admin:B6KPu1hhhAuUwmQ");

const consult = (req, res = response) => {
  const { author = "arte", material, place, title } = req.body;

  // Query por el momento cableada
  const query = `${prefixs} SELECT ?labelArtifact ?labelMaterial ?labelKeeper ?labelCreator ?id
  WHERE {
    ?prod ecrm:P108_has_produced ?artifact ;
        ecrm:P14_carried_out_by ?creator .
    ?artifact rdfs:label ?labelArtifact ;
              ecrm:P45_consists_of ?material ;
              ecrm:P50_has_current_keeper ?keeper ;
              ecrm:P48_has_preferred_identifier ?idCode .
      
    ?idCode rdfs:label ?id .          
    ?material rdfs:label ?labelMaterial .
    ?keeper rdfs:label ?labelKeeper .
    ?creator rdfs:label ?labelCreator .
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
  const query = `${prefixs} SELECT ?artifactLabel ?note ?artifactLabel ?materialLabel ?keeperLabel ?authorLabel ?id
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
  	?author rdfs:label ?authorLabel .
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
  const query = `${prefixs}SELECT DISTINCT ?label ?museum {
    ?artifact ecrm:P50_has_current_keeper ?museum .
    ?museum rdfs:label ?label
    
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
      const result = resp.results.bindings.map((museum) => {
        let newObj = {};
        Object.keys(museum).forEach((key) => (newObj[key] = museum[key].value));
        return newObj;
      });
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

const getArtifactByMuseum = (req, res = response) => {
  const { museum } = req.query;
  if (!museum)
    return res
      .status(404)
      .json({ ok: false, err: 'query param "museum" is missing.' });

  const query = `${prefixs} SELECT ?labelArtifact ?labelMaterial ?labelKeeper ?labelCreator ?note ?id
  WHERE {
    ?prod ecrm:P108_has_produced ?artifact ;
          ecrm:P14_carried_out_by ?creator .
    ?artifact rdfs:label ?labelArtifact ;
              ecrm:P45_consists_of ?material ;
              ecrm:P3_has_note ?note ;
              ecrm:P50_has_current_keeper ?keeper ;
              ecrm:P48_has_preferred_identifier ?idCode .
      
    ?idCode rdfs:label ?id .          
    ?material rdfs:label ?labelMaterial .
    ?keeper rdfs:label ${museum} .
    ?creator rdfs:label ?labelCreator .
  }
    `;
  const query2 = `${prefixs}SELECT DISTINCT ?artifactLabel{
    ?artifact ecrm:P50_has_current_keeper ?museum ;
              rdfs:label ?artifactLabel .
    ?museum rdfs:label ${museum} .
    
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
  const { title, author, material, location } = req.body;
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
                                           ecrm:P50_has_current_keeper ${location};
                                           rdfs:label "${title}" ;
                                           ecrm:P3_has_note "Test note" .

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
    .then((resp) => resp.json())
    .then((resp) =>
      res.json({
        ok: true,
      })
    )
    .catch((err) => {
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
