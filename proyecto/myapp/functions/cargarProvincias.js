const { lanzaderaCat } = require("../wrapper/cat");
const { lanzaderaCv } = require("../wrapper/cv2");
const { lanzaderaEus } = require("../wrapper/eus");

export const cargarProvincia = (provincia) => {
  if (provincia === "CV") lanzaderaCv();
  else if (provincia === "EUS") lanzaderaEus();
  else if (provincia === "CAT") lanzaderaCat();
};
