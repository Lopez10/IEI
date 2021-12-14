const express = require("express");
const cargarProvincia = require("../functions/cargarProvincias");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

router.post("/provincias", async function (req, res) {
  await cargarProvincia(req.body.provincia);
  res.render("index", {
    title: req.body.provincia,
    message: `${req.body.provincia} ha sido cargada con exito`,
  });
});

module.exports = router;
