const fetch = require("node-fetch");
const user_prefixs = `
        PREFIX : <http://curiocity.org/>
        PREFIX ecrm: <http://erlangen-crm.org/170309/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX time: <http://www.w3.org/2006/time#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  `;

const userExists = async (id) => {
  const query = `${user_prefixs} ASK{
        ?user a :Profile.
        ?user ecrm:P48_has_preferred_identifier/:P190_has_symbolic_content "${id}" .
    } `;

  if (!id) {
    return false;
  }

  return fetch(`${process.env.URL_JENA}/sparql`, {
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
      return {
        exists: resp.boolean,
      };
    })
    .catch((err) => {
      return {
        ok: false,
        err,
      };
    });
};



module.exports = {
  userExists,
  user_prefixs,
};
