const mysql = require("mysql-await");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "IEI",
});
const { Builder, Key, By, Window } = require("selenium-webdriver");
const csvtojson = require("csvtojson");
const csvFilePath = "./static/directorio-de-bibliotecas-valencianas_2020.csv";

// Conexion MYSQL
con.connect(function (err) {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

// WebDriver
let driver = new Builder().forBrowser("chrome").build();
driver.get(
  "https://www.arumeinformatica.es/blog/buscar-coordenadas-gps-en-google-maps/"
);
// driver.executeScript("window.scroll(0, 1000)");

// CSV2JSON

const converter = csvtojson({ delimiter: ";" });
converter.fromFile(csvFilePath).then((data) => {
  // console.log(data);
  creacionInsertBiblioteca(data);
});

// Inserts
const creacionInsertProvincia = async (fichero) => {
  let insertProvincia = "INSERT INTO provincia (nombre, codigo) VALUES ";
  let provincias = [];

  for (let i = 0; i < fichero.length; i++) {
    let contadorProvincias = 0;

    for (let j = 0; j < provincias.length; j++) {
      if (fichero[i].COD_PROVINCIA == provincias[j].codigo) {
        contadorProvincias++;
      }
    }
    if (contadorProvincias == 0) {
      provincias.push({
        nombre: fichero[i].NOM_PROVINCIA,
        codigo: fichero[i].COD_PROVINCIA,
      });
      insertProvincia += `("${fichero[i].NOM_PROVINCIA}", ${fichero[i].COD_PROVINCIA}),`;
    }
  }

  insertProvincia = insertProvincia.substring(0, insertProvincia.length - 1);
  await con.awaitQuery(insertProvincia);
  con.end();
};

const creacionInsertLocalidad = async (fichero) => {
  let insertLocalidad =
    "INSERT INTO localidad (id_provincia, nombre , codigo) VALUES ";
  let localidades = [];
  let provincias = await con.awaitQuery("SELECT * FROM `provincia`");

  for (let i = 0; i < fichero.length; i++) {
    let contadorLocalidades = 0;

    // Buscar duplicados
    for (let j = 0; j < localidades.length; j++) {
      if (fichero[i].COD_PROVINCIA == localidades[j].codigo) {
        contadorLocalidades++;
      }
    }

    // Construccion del string
    for (let k = 0; k < provincias.length; k++) {
      if (contadorLocalidades == 0) {
        // creacion del objeto para evitar duplicados
        if (fichero[i].COD_PROVINCIA == provincias[k].codigo) {
          localidades.push({
            id_provincia: provincias[k].id_provincia,
            nombre: fichero[i].NOM_MUNICIPIO,
            codigo: fichero[i].COD_MUNICIPIO,
          });
          // Creacion del string
          insertLocalidad += `(${provincias[k].id_provincia}, "${fichero[i].NOM_MUNICIPIO}", ${fichero[i].COD_MUNICIPIO}),`;
          contadorLocalidades++;
        }
      }
    }
  }
  insertLocalidad = insertLocalidad.substring(0, insertLocalidad.length - 1);
  await con.awaitQuery(insertLocalidad);
  con.end();
};

const creacionInsertBiblioteca = async (fichero) => {
  let localidades = await con.awaitQuery("SELECT * FROM `localidad`");
  let bibliotecas = [];
  let insertBiblioteca =
    "INSERT INTO biblioteca (codigoPostal, descripcion, email, id_localidad, latitud, longitud, nombre, telefono, tipo, direccion) VALUES ";
  for (let i = 0; i < fichero.length; i++) {
    let contadorBibliotecas = 0;

    // Buscar duplicados
    for (let j = 0; j < bibliotecas.length; j++) {
      if (fichero[i].NOMBRE == bibliotecas[j].nombre) {
        contadorBibliotecas++;
      }
    }

    // Construccion del string
    for (let k = 0; k < localidades.length; k++) {
      if (contadorBibliotecas == 0) {
        // creacion del objeto para evitar duplicados
        if (fichero[i].NOM_MUNICIPIO == localidades[k].nombre) {
          try {
            let direccion = driver.findElement(By.id("geo_directions"));
            await direccion.clear();

            await direccion.sendKeys(
              `${fichero[i].DIRECCION}, ${fichero[i].NOM_PROVINCIA}`
            );

            await driver.findElement(By.id("geo-form-button")).click();

            // Obtenemos el texto de la provincia
            let texto = await driver.findElement(By.id("infowindow")).getText();

            let latitud = texto.substring(
              texto.indexOf("Latitud:") + 9,
              texto.indexOf("Latitud:") + 18
            );
            let longitud = texto.substring(
              texto.indexOf("Longitud:") + 9,
              texto.indexOf("Longitud:") + 18
            );
            bibliotecas.push({
              id_localidad: localidades[k].id_localidad,
              codigoPostal: fichero[i].CP,
              descripcion: fichero[i].NOMBRE,
              email: fichero[i].EMAIL,
              latitud: latitud || 0,
              tipo: fichero[i].DESC_CARACTER,
              longitud: longitud || 0,
              telefono: fichero[i].TELEFONO.substring(5, 14),
              nombre: fichero[i].NOMBRE,
              direccion: fichero[i].DIRECCION,
            });
          } catch (e) {}

          // Creacion del string
          insertBiblioteca += `(${
            bibliotecas[bibliotecas.length - 1].codigoPostal
          }, "${bibliotecas[bibliotecas.length - 1].descripcion}", "${
            bibliotecas[bibliotecas.length - 1].email
          }", ${bibliotecas[bibliotecas.length - 1].id_localidad}, ${
            bibliotecas[bibliotecas.length - 1].latitud
          }, ${bibliotecas[bibliotecas.length - 1].longitud}, "${
            bibliotecas[bibliotecas.length - 1].nombre
          }", ${bibliotecas[bibliotecas.length - 1].telefono}, "${
            bibliotecas[bibliotecas.length - 1].tipo
          }", "${bibliotecas[bibliotecas.length - 1].direccion}"),`;

          contadorBibliotecas++;
        }
      }
    }
  }
  console.log(bibliotecas);

  insertBiblioteca = insertBiblioteca.substring(0, insertBiblioteca.length - 1);

  // await con.awaitQuery(insertBiblioteca);
};
