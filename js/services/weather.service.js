export const weatherService = {
  getWeather,
};
import { storageService } from './storage.service.js';

const WEATHER_KEY = '3ab3f8bc33372113714f8a4d2b913413';
// const CACHE_KEY = 'weatherDB';

function getWeather(coords) {
  //   const termWeather = storageService.load(CACHE_KEY) || {};
  //   if (termWeather[coords]) return Promise.resolve(termWeather[coords]);

  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coords.lat}&lon=${coords.lng}&appid=${WEATHER_KEY}`;

  return axios
    .get(url)
    .then((weather) => {
      console.log('data', weather.data);
      console.log(weather);
      var currWeather = {
        city: weather.data.name,
        temp: weather.data.main.temp,
        tempMin: weather.data.main.temp_min,
        tempMax: weather.data.main.temp_max,
        weatherDesc: weather.data.weather[0].description,
        windSpeed: weather.data.wind.speed,
        updatedAt: Date.now(),
        icon: `http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`,
      };
      //   termWeather[coords] = currWeather;
      //   storageService.save(CACHE_KEY, termWeather);
      return currWeather;
    })

    .catch((error) => {
      console.log('error', error);
    });
}
