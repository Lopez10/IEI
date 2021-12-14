const cargaCatalunya = require("../wrapper/cat");
const cargarCv = require("../wrapper/cv2");
const cargarEus = require("../wrapper/eus");

const cargarProvincia = async (provincia) => {
  if (provincia === "CV") await cargarCv();
  else if (provincia === "EUS") cargarEus();
  else if (provincia === "CAT") cargaCatalunya();
};

module.exports = cargarProvincia;
