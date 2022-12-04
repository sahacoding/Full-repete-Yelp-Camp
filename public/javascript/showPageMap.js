mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
//center: [-74.5, 40], // starting position [lng, lat]
center: campgroundmapj.geometry.coordinates,
zoom: 9, // starting zoom 
//projection: 'globe' // display the map as a 3D globe
});

new mapboxgl.Marker()
//.setLngLat([-74.5, 40])
.setLngLat(campgroundmapj.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(
      `<h3>${campgroundmapj .tittle}</h3><p>${campgroundmapj .location}</p>`
    )
  )
.addTo(map)

