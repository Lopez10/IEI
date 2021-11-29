const cargarProvincia = (provincia) => {
  if (provincia === "CV") {
    const consultaPreviaCV = require("../wrapper/cv2");
  } else if (provincia === "EUS") {
    const consultaPreviaEUS = require("../wrapper/eus");
  } else if (provincia === "CAT") {
    const consultaPreviaCAT = require("../wrapper/cat");
  }
};

module.exports = cargarProvincia;
