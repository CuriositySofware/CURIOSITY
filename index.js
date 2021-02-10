const express = require("express");
const router = require("./routes/consult");
const cors = require("cors");
// Servidor express
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
