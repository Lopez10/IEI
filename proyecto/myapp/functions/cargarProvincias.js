const cargaCatalunya = require("../wrapper/cat");
const cargarCv = require("../wrapper/cv2");
const cargarEus = require("../wrapper/eus");

const cargarProvincia = async (provincia) => {
  if (provincia === "CV") await cargarCv();
  else if (provincia === "EUS") cargarEus();
  else if (provincia === "CAT") cargaCatalunya();
};

const busquedaPorNombre = async ({ localidad, cp, provincia, tipo }) => {
  // TODO: Sacar el id provincia
  // TODO: Sacar el id localidad

  `SELECT * FROM 'biblioteca' WHERE 'id_localidad' LIKE '${localidad}%' AND 'codigoPostal' LIKE '${cp}%' AND 'tipo' LIKE '${tipo}%'`;
};

module.exports = { cargarProvincia, busquedaPorNombre };
