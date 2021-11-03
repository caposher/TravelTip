import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'

// window.onload = onInit;
// window.onAddMarker = onAddMarker;
// window.onPanTo = onPanTo;
// window.onGetLocs = onGetLocs;
// window.onGetUserPos = onGetUserPos;

// window.onSearch = onSearch;
// window.onMyLocation = onMyLocation;
// window.onDeleteLocation = onDeleteLocation;
// window.onChangeLocation = onChangeLocation;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log("Getting Pos");
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

var coords={
    lat:32.0749831,
    lng:34.9120554
};

onGetWeather(coords);

function onGetWeather(coords){
    weatherService.getWeather(coords)
    .then(weather => renderWeather(weather));
}

function renderWeather(currWeather){
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