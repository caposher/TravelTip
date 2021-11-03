import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
import { weatherService } from './services/weather.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

// window.onDeleteLocation = onDeleteLocation;
// window.onChangeLocation = onChangeLocation;

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready');
    })
    .catch(() => console.log('Error: cannot init map'));
}

function onAddMarker() {
  console.log('Adding a marker');
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
  const loc = document.querySelector('.input-search').value;
  if (loc) {
    locService.getLoc(loc).then((locs) => {
      console.log('Locations:', locs);
      document.querySelector('.curr-loc').innerText = locs.name;
      mapService.panTo(locs.lat, locs.lng);
    });
  }
}

function onGetUserPos() {
  mapService
    .getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords);
      mapService.panTo(pos.coords.latitude, pos.coords.longitude);
    })
    .catch((err) => {
      console.log('Failed to get user position', err);
    });
}

function renderLocTable() {
  locService
    .getLocs()
    .then((locs) => {
      let HTMLstr = locs.map((loc) => {
        return `<li>
              <p>${loc.name}</p>
              <button onclick="">🗑️</button>
              <button>📌</button>
              </li>`;
      });
    })
    .catch((err) => console.log('Failed to render locations table'));
}

// var coords={
//     lat:32.0749831,
//     lng:34.9120554
// };

// onGetWeather(coords);

function onGetWeather(coords) {
  weatherService.getWeather(coords).then((weather) => renderWeather(weather));
}

function renderWeather(currWeather) {
  // var currWeather = {
  // city: weather.data.name,
  // temp: weather.data.main.temp,
  // tempMin:weather.data.main.temp_min,
  // tempMax: weather.data.main.temp_max,
  // weatherDesc:weather.data.weather[0].description,
  // windSpeed: weather.data.wind.speed,
  // icon: `http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`
  var elWeather = document.querySelector('.weather-container');
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
