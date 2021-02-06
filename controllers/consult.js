const { response } = require("express");
const fetch = require("node-fetch");

const consult = (_, res = response) => {
  const prefixs = `
        PREFIX ecrm: <http://erlangen-crm.org/170309/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX time: <http://www.w3.org/2006/time#>
        PREFIX cit: <http://curiocity.org/>
        `;

  // Query por el momento cableada
  const query = `${prefixs} SELECT ?label
  WHERE {
    ?prod ecrm:P108_has_produced ?artifact ;
            ecrm:P4_has_time-span ?span .
    ?period ecrm:P4_has_time-span ?span ;
            a ecrm:E4_Period ;
            rdfs:label ?label.
    {
      SELECT (?s as ?artifact)
      WHERE {
        ?s a ecrm:E22_Man-Made_Object ;
           rdfs:label "Puntas Líticas" ;
           ecrm:P48_has_preferred_identifier ?o .                    
      }
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

module.exports = {
  consult,
};
