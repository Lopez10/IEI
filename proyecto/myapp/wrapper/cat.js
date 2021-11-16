const fs = require('fs');
const parser = require('xml2json');

const lecturaXML = (direccion) => {
	let data = fs.readFileSync(direccion, 'utf8');
	return data;
};

let cat = lecturaXML('./static/biblioteques.xml');

let json = parser.toJson(cat);
json = JSON.parse(json);
console.log(json.response);
