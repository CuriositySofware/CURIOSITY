const { response } = require("express");
const fetch = require("node-fetch");

const consult = (req, res = response) => {
  const { author } = req.body;
  const prefixs = `
        PREFIX ecrm: <http://erlangen-crm.org/170309/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX time: <http://www.w3.org/2006/time#>
        PREFIX cit: <http://curiocity.org/>
        `;

  // Query por el momento cableada
  const query = `${prefixs} SELECT ?labelArtifact ?labelMaterial ?labelKeeper
  WHERE {
    ?prod ecrm:P108_has_produced ?artifact ;
        ecrm:P14_carried_out_by ?creator .
    ?artifact rdfs:label ?labelArtifact ;
              ecrm:P45_consists_of ?material ;
              ecrm:P50_has_current_keeper ?keeper .
      
    ?material rdfs:label ?labelMaterial .
    ?keeper rdfs:label ?labelKeeper .        
    {
      SELECT (?c as ?creator)
      WHERE {
        ?c a ecrm:E39_Actor ;
           rdfs:label "${author}" .                  
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
