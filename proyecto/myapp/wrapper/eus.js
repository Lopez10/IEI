// Fichero estatico js (no usamos express)

const fs = require('fs');

// codigo conexion mysql (prueba)
const mysql = require('mysql');
let con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'IEI',
});
con.connect(function (err) {
	if (err) {
		console.log('Error connecting to Db');
		return;
	}
	console.log('Connection established');
});
//

const lecturaJSON = (direccion) => {
	let data = fs.readFileSync(direccion, 'utf8');
	let obj = JSON.parse(data);
	return obj;
};

const creacionInsertProvincia = (fichero) => {
	let insertProvincia =
		'INSERT INTO provincia (codigo, nombre) VALUES ("Gipuzkoa", 20), ("Bizkaia", 48), ("Araba", 01)';
	for (let i = 0; i < fichero.length; i++) {
		console.log(fichero[i].territory, ' ', fichero[i].postalcode.substr(0, 2));
	}
};

const creacionInsertLocalidad = (fichero) => {
	let insertLocalidad = 'INSERT INTO localidad (id_provincia, codigo , nombre)';
	let localidades = [];
	let localidadesText = '';
	// Seleccionar localidades no repetidas
	for (let i = 0; i < fichero.length; i++) {
		let contadorLocalidades = 0;
		for (let j = 0; j < localidades.length; j++) {
			if (fichero[i].municipality == localidades[j].nombre) {
				contadorLocalidades++;
			}
		}
		if (contadorLocalidades == 0) {
			localidades.push({
				nombre: fichero[i].municipality,
				codigo: fichero[i].postalcode.replace('.', ''),
			});
		}
	}

	// Crear string localidades
	for (let i = 0; i < localidades.length; i++) {
		localidadesText += `(${localidades[i].nombre}, ${localidades[i].codigo}),`;
	}
	console.log(localidadesText);
};

const creacionInsertBiblioteca = (fichero) => {
	let insertBiblioteca =
		'INSERT INTO biblioteca (codigoPostal, descripcion, email, id_localidad, latitud, longitud, nombre, telefono, tipo)';

	for (let i = 0; i < fichero.length; i++) {
		console.log(fichero[i].territory, ' ', fichero[i].postalcode.replace('.', ''));
	}
};

let eus = lecturaJSON('./static/json/bibliotecas.json');
creacionInsertLocalidad(eus);
