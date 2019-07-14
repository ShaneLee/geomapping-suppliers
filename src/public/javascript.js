let mymap

let lat = 52.8816388
let long = -1.4307836999999999

window.onload = function() {
  let request = new XMLHttpRequest();
  let requestURL = "/suppliers";
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function() {
    const suppliers = request.response;
    addMap(suppliers)
  }
}

function addMap(suppliers) {
  let mapdiv = document.createElement('div')
  mapdiv.id = 'mapid'
  document.body.appendChild(mapdiv)
  createMap(suppliers)
}

function createMap(suppliers) {
  mymap = L.map('mapid').setView([lat, long], 13)
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic2hhbmVsZWVlIiwiYSI6ImNqd2RzbDQ2bzE1ejQ0OG1vOWNhaWk0a3YifQ.nZMoPave66hDIrmD9OgbzA'
  }).addTo(mymap)

  addCircles(suppliers)
}

function addCircles(suppliers) {
  console.log(suppliers)
  for (let supplier of suppliers) {
    let circle = L.circle([supplier.lat, supplier.long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 25 * 1609.34
    })
    circle.bindPopup(supplier.name)
    circle.addTo(mymap);
  }
}
