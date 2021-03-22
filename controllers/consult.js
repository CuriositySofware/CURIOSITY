const { response, request } = require("express");
const fetch = require("node-fetch");

const prefixs = `
      PREFIX ecrm: <http://erlangen-crm.org/170309/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX time: <http://www.w3.org/2006/time#>
      PREFIX cit: <http://curiocity.org/>
      `;
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
  fetch(`http://localhost:3030/CURIOSITY/sparql`, {
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

  fetch(`http://localhost:3030/CURIOSITY/sparql`, {
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
  const query = `${prefixs}SELECT DISTINCT ?label {
    ?artifact ecrm:P50_has_current_keeper ?museum .
    ?museum rdfs:label ?label
    
}`;

  fetch(`http://localhost:3030/CURIOSITY/sparql`, {
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
      const result = resp.results.bindings.map((elem) => elem.label.value);
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

  const query = `${prefixs}SELECT DISTINCT ?artifactLabel{
    ?artifact ecrm:P50_has_current_keeper ?museum ;
              rdfs:label ?artifactLabel .
    ?museum rdfs:label ${museum} .
    
  }`;

  fetch(`http://localhost:3030/CURIOSITY/sparql`, {
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

module.exports = {
  consult,
  getArtifactById,
  getMuseums,
  getArtifactByMuseum,
};
