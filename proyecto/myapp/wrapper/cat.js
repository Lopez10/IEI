const fs = require('fs');
const parser = require('xml2json');
const { Builder, Key, By } = require('selenium-webdriver');

const mysql = require('mysql-await');
let con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'IEI',
});
con.connect(function (err) {
	if (err) {
		console.log('Error connecting to Db');
		return;
	}
	console.log('Connection established');
});

// Creamos el driver de la pagina distritopostal
let driver = new Builder().forBrowser('chrome').build();
driver.get('http://distritopostal.es');

// Parse
const lecturaXML = (direccion) => {
	let data = fs.readFileSync(direccion, 'utf8');
	return data;
};

let cat = lecturaXML('./static/biblioteques.xml');

let json = parser.toJson(cat);
json = JSON.parse(json);

const creacionInsertProvincia = async (fichero) => {
	let insertProvincia = 'INSERT INTO provincia (nombre, codigo) VALUES ';
	let provincias = [];

	for (let i = 0; i < fichero.length; i++) {
		let contadorProvincias = 0;

		for (let j = 0; j < provincias.length; j++) {
			if (fichero[i].cpostal.substr(0, 2) == provincias[j].codigo) {
				contadorProvincias++;
			}
		}
		if (contadorProvincias == 0) {
			// Introducimos en el campo qcp el codigo postal y presionamos enter
			await driver
				.findElement(By.id('qcp'))
				.sendKeys(fichero[i].cpostal.substr(0, 2), Key.ENTER);

			// Obtenemos el texto de la provincia
			let provincia = await driver.findElement(By.className('youarehere')).getText();
			provincias.push({
				nombre: provincia,
				codigo: fichero[i].cpostal.substr(0, 2),
			});
			insertProvincia += `("${provincia}", ${fichero[i].cpostal.substr(0, 2)}),`;
		}
	}

	insertProvincia = insertProvincia.substring(0, insertProvincia.length - 1);
	await driver.quit();
	await con.awaitQuery(insertProvincia);
	con.end();
};

creacionInsertProvincia(json.response.row);
