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
	let insertProvincia = 'INSERT INTO provincia (nombre, codigo) VALUES ';
	let provincias = [];

	for (let i = 0; i < fichero.length; i++) {
		let contadorProvincias = 0;
		for (let j = 0; j < provincias.length; j++) {
			if (fichero[i].territory == provincias[j].nombre) {
				contadorProvincias++;
			}
		}
		if (contadorProvincias == 0) {
			provincias.push({
				nombre: fichero[i].territory,
				codigo: fichero[i].postalcode.substr(0, 2),
			});
			insertProvincia += `("${fichero[i].territory}", ${fichero[i].postalcode.substr(
				0,
				2
			)}),`;
		}
	}
	insertProvincia = insertProvincia.substring(0, insertProvincia.length - 1);
	//con.query(insertProvincia);
	//console.log(insertProvincia);
};

const creacionInsertLocalidad = (fichero) => {
	let insertLocalidad = 'INSERT INTO localidad (id_provincia, codigo , nombre) VALUES';
	let localidades = [];
	let localidadesText = '';

	// Seleccionar localidades no repetidas
	//TODO: cambiar push por string
	//TODO: Hacer SELECT en vez de comprobaciones (IF)
	for (let i = 0; i < fichero.length; i++) {
		let contadorLocalidades = 0;
		for (let j = 0; j < localidades.length; j++) {
			if (fichero[i].municipality == localidades[j].nombre) {
				contadorLocalidades++;
			}
		}
		if (contadorLocalidades == 0) {
			if (fichero[i].territory == 'Gipuzkoa') {
				localidades.push({
					id_provincia: 1,
					nombre: fichero[i].municipality,
					codigo: fichero[i].postalcode.replace('.', ''),
				});
			} else if (fichero[i].territory == 'Bizkaia') {
				localidades.push({
					id_provincia: 2,
					nombre: fichero[i].municipality,
					codigo: fichero[i].postalcode.replace('.', ''),
				});
			} else if (fichero[i].territory == 'Araba') {
				localidades.push({
					id_provincia: 3,
					nombre: fichero[i].municipality,
					codigo: fichero[i].postalcode.replace('.', ''),
				});
			}
		}
	}

	// Crear string localidades
	// TODO: se puede cargar y meter en el otro bucle
	for (let i = 0; i < localidades.length; i++) {
		if (i == localidades.length - 1)
			localidadesText += `(${localidades[i].id_provincia}, "${localidades[i].nombre}", ${localidades[i].codigo})`;
		else
			localidadesText += `(${localidades[i].id_provincia}, "${localidades[i].nombre}", ${localidades[i].codigo}),`;
	}
	//console.log(insertLocalidad + localidadesText);
	//con.query(insertLocalidad + localidadesText);
};

const creacionInsertBiblioteca = (fichero) => {
	let insertBiblioteca =
		'INSERT INTO biblioteca (codigoPostal, descripcion, email, id_localidad, latitud, longitud, nombre, telefono, tipo)';

	for (let i = 0; i < fichero.length; i++) {
		console.log(fichero[i].territory, ' ', fichero[i].postalcode.replace('.', ''));
	}
};

let eus = lecturaJSON('./static/json/bibliotecas.json');
creacionInsertProvincia(eus);

con.end();
