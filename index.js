require("dotenv").config();
const express = require("express");
const router = require("./routes/consult");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const jwtSecret = process.env.JWT_SECRET;

// Servidor express
const app = express();

app.use(express.static(path.join(__dirname, "build")));
app.use(cookieParser(jwtSecret));
app.use(cors());
app.use(express.json());
app.use("/", router);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
