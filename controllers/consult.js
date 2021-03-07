const { response, request } = require("express");
const fetch = require("node-fetch");

const prefixs = `
      PREFIX ecrm: <http://erlangen-crm.org/170309/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX time: <http://www.w3.org/2006/time#>
      PREFIX cit: <http://curiocity.org/>
      `;
const consult = (req, res = response) => {
  const { author, material, place, title } = req.body;

  // Query por el momento cableada
  const query = `${prefixs} SELECT ?labelArtifact ?labelMaterial ?labelKeeper ?labelCreator ?id
  WHERE {
    ?prod ecrm:P108_has_produced ?artifact ;
        ecrm:P14_carried_out_by ?creator .
    ?artifact rdfs:label ?labelArtifact ;
              ecrm:P45_consists_of ?material ;
              ecrm:P50_has_current_keeper ?keeper ;
              ecrm:P1_is_identified_by ?idCode .
      
    ?idCode rdfs:label ?id .          
    ?material rdfs:label ?labelMaterial .
    ?keeper rdfs:label ?labelKeeper .
    ?creator rdfs:label ?labelCreator .
    ${
      author &&
      `FILTER( regex(lcase(?labelCreator), "${author.toLowerCase()}" )) .`
    }       
    ${
      material &&
      `FILTER( regex(lcase(?labelMaterial), "${material.toLowerCase()}" )) .`
    }
    ${
      title &&
      `FILTER( regex(lcase(?labelArtifact), "${title.toLowerCase()}" )) .`
    }
    ${
      place &&
      `FILTER( regex(lcase(?labelKeeper), "${place.toLowerCase()}" )) .`
    }
    
  }`;
  // La query se envia por query params, de esta manera se codifica para poder ser enviada
  const urlEncodeQuery = encodeURIComponent(query);

  // Aca se envia la consulta a graphDB(por ahora en local)
  fetch(
    `http://localhost:7200/repositories/USB-CURIOSITY?query=${urlEncodeQuery}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/sparql-results+json",
      },
    }
  )
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
  const query = `${prefixs} SELECT ?artifactLabel ?note ?artifactLabel ?materialLabel ?keeperLabel ?authorLabel
  WHERE {
    ?artifact a ecrm:E22_Man-Made_Object ;
     		ecrm:P1_is_identified_by ?idCode ;
    		ecrm:P3_has_note ?note ;
    		rdfs:label ?artifactLabel ;
      		ecrm:P50_has_current_keeper ?keeper ;
    		ecrm:P45_consists_of ?material ;
      		ecrm:P108i_was_produced_by ?prod .
    
    ?prod ecrm:P14_carried_out_by ?author .
    ?author rdfs:label ?authorLabel .
    ?material rdfs:label ?materialLabel .
    ?keeper rdfs:label ?keeperLabel .
    ?idCode rdfs:label "${id}" . 
  }`;

  const urlEncodeQuery = encodeURIComponent(query);

  fetch(
    `http://localhost:7200/repositories/USB-CURIOSITY?query=${urlEncodeQuery}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/sparql-results+json",
      },
    }
  )
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
};
