const { response } = require("express");
const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");
const { prefixs } = require("../controllers/consult");

const getImage = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(403).send("Bad request");
  }

  let query = prefixs;
  query += `SELECT ?artifact ?filename
  WHERE  {
    BIND ( "${id}" AS ?id_l)
    ?artifact a ecrm:E22_Man-Made_Object .
    ?artifact ecrm:P48_has_preferred_identifier/rdfs:label ?id_l .
    ?process ecrm:L1_digitized ?artifact ;
        ecrm:L20_has_created/:T2_has_file_name ?filename .
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

      if (!result[0].filename.value) {
        return res.status(404).json({
          ok: false,
        });
      }
      const pathImage = path.join(
        path.join(__dirname, "../assets/"),
        result[0].filename.value
      );

      fs.stat(pathImage, (error) => {
        if (error) {
          res.status(404).json({
            ok: false,
            error,
          });
        } else {
          res.status(200).sendFile(pathImage);
        }
      });
    })
    .catch((err) => {
      res.status(404).json({
        ok: false,
        err,
      });
    });
};

const getMuseumImages = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(403).send("Bad request");
  }
  const pathImage = path.join(__dirname, `../assets/Museos/${id}`);

  const respons = [];
  fs.readdir(pathImage, (error, files) => {
    if (error) {
      return res.status(404).json({
        ok: false,
        error: "El path no existe",
      });
    }

    files.forEach((file) => {
      const content = fs.readFileSync(path.join(pathImage, file), {
        encoding: "base64",
      });
      respons.push({
        name: file,
        source: content,
      });
    });

    res.status(200).json({
      ok: true,
      result: respons,
    });
  });
};

module.exports = {
  getImage,
  getMuseumImages,
};
