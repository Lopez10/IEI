mapboxgl.accessToken = 'pk.eyJ1IjoibGppbGphbmUiLCJhIjoiY2t5bHZvenRwM2E2eDJ3bzhvb2xnMWs5dyJ9.NmX3K9V77GTmnKb8SFuq6A';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-3.70256, 40.4165], // starting position [lng, lat]
    zoom: 4 // starting zoom
});

const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-3.70256, 40.4165]
        },
        properties: {
          title: 'Biblioteca Madrid',
          description: 'Madrid, Spain'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.376805, 39.4702]
        },
        properties: {
          title: 'Biblioteca Valencia',
          description: 'Valencia, Spain'
        }
      }
    ]
  };
  

function loadMap() {
    for (const feature of geojson.features) {
        const marker = new mapboxgl.Marker()
            .setLngLat(feature.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(
                    `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                  )
              )
            .addTo(map);
    }
}

loadMap();