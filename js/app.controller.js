import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

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
