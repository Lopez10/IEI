const express = require("express");
const {
  cargarProvincia,
  busquedaPorNombre,
} = require("../functions/cargarProvincias");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

router.post("/provincias", async (req, res) => {
  await cargarProvincia(req.body.provincia);
  res.render("index", {
    title: req.body.provincia,
    message: `${req.body.provincia} ha sido cargada con exito`,
  });
});

router.get("/provincias/:provincia", async (req, res) => {
  let nombre = req.params.provincia;
  let data = await busquedaPorNombre(nombre);
  console.log(data);
  // return data;
});
module.exports = router;
