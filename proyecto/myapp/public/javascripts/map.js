mapboxgl.accessToken = 'pk.eyJ1IjoibGppbGphbmUiLCJhIjoiY2t5bHZvenRwM2E2eDJ3bzhvb2xnMWs5dyJ9.NmX3K9V77GTmnKb8SFuq6A';


const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-3.70256, 40.4165], // starting position [lng, lat]
    zoom: 4 // starting zoom
});

// --> EJEMPLOS DE PRUEBA: <--
const libraryArray = [
    {
        "id_biblioteca": 1,
        "id_localidad": 1,
        "nombre": "BIBLIOTECA ESPECIALIZADA COLEGIO OFICIAL DE INGENIEROS AGRÓNOMOS DE LEVANTE VALÈNCIA",
        "tipo": "PRIVADA",
        "direccion": "AVENIDA BOTÁNICO CAVANILLES Nº 20",
        "codigoPostal": 46010,
        "longitud": 0,
        "latitud": 0,
        "telefono": 963696660,
        "email": "coial@iies.es",
        "descripcion": "BIBLIOTECA ESPECIALIZADA COLEGIO OFICIAL DE INGENIEROS AGRÓNOMOS DE LEVANTE VALÈNCIA"
    },
    {
        "id_biblioteca": 2,
        "id_localidad": 1,
        "nombre": "BIBLIOTECA INVENTADA DE MADRID",
        "tipo": "PRIVADA",
        "direccion": "AVENIDA TIRSO DE MOLINA Nº 3-BAJ",
        "codigoPostal": 46009,
        "longitud": -3.7025,
        "latitud": 40.4165,
        "telefono": 963493910,
        "email": "cdlvalencia@cdlvalencia.org",
        "descripcion": "BIBLIOTECA ESPECIALIZADA C OFICIAL DOCTORES Y LICENCIADOS FILOSOFÍA,LETRAS Y CIENCIAS VALÈNCIA"
    },
    {
        "id_biblioteca": 22,
        "id_localidad": 21,
        "nombre": "Biblioteca Fundació Maurí",
        "tipo": "Privada",
        "direccion": "C/ Cardedeu, 17",
        "codigoPostal": 8530,
        "longitud": 2.2872308338599283,
        "latitud": 41.68609537358605,
        "telefono": 938714501,
        "email": "fundaciomauri@gmail.com",
        "descripcion": "Biblioteca Fundació Maurí"
    }
];

function loadMap(bibliotecas) {
    for (const library of bibliotecas) {
        const marker = new mapboxgl.Marker()
            .setLngLat([library.longitud, library.latitud])
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(
                    `<h3>${library.nombre}</h3><p>${library.tipo}</p>`
                  )
              )
            .addTo(map);
    }
}

// --> MÉTODO PARA METER PINES AL MAPA
loadMap(libraryArray);