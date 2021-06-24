const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");
const { Base64 } = require("js-base64");
const prefixs = `
        PREFIX ecrm: <http://erlangen-crm.org/170309/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX time: <http://www.w3.org/2006/time#>
        PREFIX : <http://curiocity.org/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      `;
const auth = Base64.encode("admin:curiocity@2021");

const createArtifactUtil = (new_artifact) => {
  const { title, author, material, location, description, type, prevId } =
    new_artifact;

  const id = prevId ?? uuidv4();
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
                                             ecrm:P3_has_note "${description}" ;
                                             ecrm:P2_has_type :${type} .
  
        :${authorUrl} rdfs:label "${author}" .
        <http://curiocity.org/${id}/Production> rdf:type ecrm:E12_Production ;
                                                 ecrm:P14_carried_out_by :${authorUrl};
                                                 ecrm:P108_has_produced <http://curiocity.org/${id}/Object> .
  
    }
    `;

  return fetch(`${process.env.URL_JENA}/update`, {
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
    .then((resp) => {
      return { ok: true };
    })
    .catch((err) => {
      console.log(err);
      return {
        ok: false,
        err,
      };
    });
};

module.exports = { createArtifactUtil };
