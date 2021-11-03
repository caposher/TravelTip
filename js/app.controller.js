import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
import { weatherService } from './services/weather.service.js';

window.onload = onInit;
// window.onAddMarker = onAddMarker;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onDeleteLoc = onDeleteLoc;
window.onChangeLoc = onChangeLoc;
window.onGetLink = onGetLink;

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready');
      const coords = _encodeUrl();
      if (coords.lat && coords.lng) {
        mapService.panTo(coords.lat, coords.lng);
      }
    })
    .catch(() => console.log('Error: cannot init map'));
}

// function onAddMarker() {
//   console.log('Adding a marker');
//   mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
// }

function onGetLocs() {
  const loc = document.querySelector('.input-search').value;
  if (loc) {
    locService.getLoc(loc).then((loc) => {
      console.log('Locations:', loc);
      renderInfo(loc);
    });
  }
}

function onGetUserPos() {
  mapService
    .getPosition()
    .then((pos) => {
      mapService.panTo(pos.coords.latitude, pos.coords.longitude);
    })
    .catch((err) => {
      console.log('Failed to get user position', err);
    });
}

function onGetWeather(coords) {
  weatherService.getWeather(coords).then((weather) => renderWeather(weather));
}

function onDeleteLoc(id) {
  locService.deleteLoc(id);
  renderLocTable();
}

function onChangeLoc(id) {
  const locs = locService.getLocs();
  const loc = locs.find((loc) => loc.id === id);
  console.log('locs', locs);
  renderInfo(loc);
}

function onGetLink() {
  const elLink = document.querySelector('.link-url');
  elLink.select();
  navigator.clipboard.writeText(elLink.value);
}

function renderInfo(loc) {
  let url = `https://caposher.github.io/TravelTip/index.html?lat=${loc.lat}&lng=${loc.lng}`;
  document.querySelector('.link-url').value = url;

  document.querySelector('.curr-loc').innerText = loc.name;
  mapService.panTo(loc.lat, loc.lng);
  onGetWeather({ lat: loc.lat, lng: loc.lng });
  mapService.addMarker({ lat: loc.lat, lng: loc.lng });
  renderLocTable();
}

function renderLocTable() {
  const locs = locService.getLocs();
  let strHTML = locs.map((loc) => {
    return `<li>
          <p>${loc.name}</p>
          <div class="buttons btn">
          <button onclick="onDeleteLoc('${loc.id}')">🗑️</button>
          <button onclick="onChangeLoc('${loc.id}')">📌</button>
          </div>
          </li>`;
  });
  document.querySelector('.loc-container').innerHTML = strHTML.join('');
}

function renderWeather(currWeather) {
  const elWeather = document.querySelector('.weather-container');
  const strHtmls = `
        <p>City: ${currWeather.city}</p>
        <p class="weather-desc"><img class="weather-icon" src="${currWeather.icon}"/></p>
        <p> ${currWeather.weatherDesc}</p>
        <p>Current Temp ${currWeather.temp}°C</p>
        <p>Temperature: from ${currWeather.tempMin}°C to ${currWeather.tempMax}°C</p>
        <p>Wind: ${currWeather.windSpeed}m/s</p>
        `;

  elWeather.innerHTML = strHtmls;
}

function _encodeUrl() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
}
