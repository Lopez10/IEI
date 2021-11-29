const express = require("express");
const cargarProvincia = require("../functions/cargarProvincias");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});
router.post("/provincias", function (req, res) {
  cargarProvincia(req.body.provincia);
  res.send("funciona");
});

module.exports = router;
