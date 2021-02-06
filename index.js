const express = require("express");
const router = require("./routes/consult");
console.log("ess");
// Servidor express
const app = express();

app.use(express.json());
app.use("/", router);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
