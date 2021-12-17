const express = require("express");
const {
  cargarProvincia,
  busquedaPorNombre,
} = require("../functions/cargarProvincias");
const router = express.Router();

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

router.get("/busqueda", async (req, res) => {
  let data = req.params;
  let result = await busquedaPorNombre(data);
  console.log(result);
  // return result;
});
module.exports = router;
