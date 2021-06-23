const { userData, user_prefixs } = require("./utils");
const validator = require("email-validator");
const { Base64 } = require("js-base64");
const fetch = require("node-fetch");
const auth = Base64.encode("admin:curiocity@2021");

const userInfo = async (req, res) => {
  const userInfo = await userData(req.user);

  if (!userInfo.ok) {
    return res.status(500).json({
      ok: false,
      message: userInfo.message,
    });
  }

  delete userInfo["password"];
  return res.status(200).json({
    ok: true,
    message: "Información de usuario encontrada",
    user: userInfo,
  });
};

const userEdit = async (req, res) => {
  const email = req.params.email;
  const requester_email = req.user;

  if (!email || !validator.validate(email)) {
    return res.status(403).json({
      ok: false,
      message: "Se requiere el email del usuario a editar",
    });
  }
  if (!req.body.first_name || !req.body.last_name) {
    return res.status(400).json({
      ok: false,
      message: "Todos los campos son necesarios",
    });
  }

  const { first_name, last_name } = req.body;

  const userInfo = await userData(email);
  if (!userInfo.ok) {
    return res.status(500).json({
      ok: false,
      message: "Ha ocurrido un error",
    });
  }

  if (email !== requester_email) {
    return res.status(401).json({
      ok: false,
      message: "Solo se puede editar el propio usuario",
    });
  }

  update =
    user_prefixs +
    `
    DELETE {
      ?user :first_name "${userInfo.first_name}".
      ?user :last_name "${userInfo.last_name}".
      }
    INSERT {
      ?user :first_name "${first_name}".
      ?user :last_name "${last_name}".
      }
    WHERE{
      ?user :email "${email}" .
    }`;

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
    .then(async (resp) => {
      if (resp.status === 200) {
        const newInfo = await userData(email);
        delete newInfo["password"];
        //Update user info
        return res.status(200).json({
          ok: true,
          message: "¡Información actualizada!",
          user: newInfo,
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
        registered: false,
        message: err,
      });
    });
};

module.exports = { userInfo, userEdit };
