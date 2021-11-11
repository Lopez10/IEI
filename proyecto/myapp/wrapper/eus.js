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
	let insertProvincia = 'INSERT INTO provincia (codigo, nombre)';
	let insertLocalidad = 'INSERT INTO localidad (codigo, id_provincia, nombre)';
	let insertBiblioteca =
		'INSERT INTO biblioteca (codigoPostal, descripcion, email, id_localidad, latitud, longitud, nombre, telefono, tipo)';
	for (let i = 0; i < fichero.length; i++) {
		consulta;
	}
};

let eus = lecturaJSON('./static/json/bibliotecas.json');
creacionInsert(eus);
