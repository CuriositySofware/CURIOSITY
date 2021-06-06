const fetch = require("node-fetch");
const { Base64 } = require("js-base64");
const { userExists, user_prefixs } = require("./utils");

const auth = Base64.encode("admin:curiocity@2021");

const registerUser = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "No se encontro cuerpo de la consulta",
    });
  }
  if (
    !req.body.email ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.password
  ) {
    return res.status(400).json({
      message: "Todos los campos son necesarios",
    });
  }

  const { email, first_name, last_name, password } = req.body;
  const id_user = email.replace("@", "");

  const verifyExistence = await userExists(id_user);

  if (verifyExistence.err) {
    return res.status(500).json({
      ok: false,
      err: verifyExistence.error,
    });
  }
  if (verifyExistence.exists) {
    return res.status(400).json({
      ok: false,
      message: "El usuario ya se encuentra registrado",
    });
  }

  const update =
    user_prefixs +
    `INSERT DATA {
    :${id_user} rdf:type owl:NamedIndividual,
                    ecrm:E42_Identifier ;
                    ecrm:P2_hastype :ID-USER ;
                    :P190_has_symbolic_content "${id_user}" .
    };    
    INSERT DATA {
    :${id_user}-profile rdf:type owl:NamedIndividual,
                            :Profile ;
                            :has_user_type :visitor ;
                            ecrm:P48_has_preferred_identifier :${id_user} ;
                            :email "${email}" ;
                            :first_name "${first_name}" ;
                            :last_name "${last_name}" ;
                            :password "${password}" .
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
    .then((resp) => {
      if (resp.status === 200) {
        return res.status(200).json({
          ok: true,
          registered: true,
          message: "Usuario registrado!",
        });
      }
      return res.status(400).json({
        ok: false,
        registered: false,
        message: "Ha ocurrido un error en el registro",
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

module.exports = {
  registerUser,
  user_prefixs,
};
