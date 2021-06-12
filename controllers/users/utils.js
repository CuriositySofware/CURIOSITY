const fetch = require("node-fetch");
const bcrypt = require("bcrypt");

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

const userData = async (email) => {
  const query = `${user_prefixs} 
    SELECT ?user ?user_type ?first_name ?last_name ?email ?password 
      WHERE  {
        BIND ( "${email}" AS ?email)
    ?user :has_user_type ?user_type;
          :email ?email ;
          :first_name ?first_name;
          :last_name ?last_name;
          :password ?password .
  } `;

  if (!email) {
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
      const result = resp.results.bindings;
      if (result) {
        return {
          ok: true,
          first_name: result[0].first_name?.value,
          last_name: result[0].last_name?.value,
          type: result[0].user_type?.value?.includes("visitor") ? "visitor" : "admin",
          password: result[0].password?.value,
        };
      }

      return {
        ok: false,
        message: "Usuario no encontrado",
      };
    })
    .catch((err) => {
      return {
        ok: false,
        message: err.toString(),
      };
    });
};

const comparePassword = async (storedPassword, enteredPassword) => {
  const result = await bcrypt.compare(enteredPassword, storedPassword);
  return result;
};

module.exports = {
  userExists,
  user_prefixs,
  userData,
  comparePassword,
};
