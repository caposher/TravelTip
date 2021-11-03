import { storageService } from './storage.service.js';

export const locService = {
  getLoc,
  getLocs,
  deleteLoc,
};

const STORAGE_KEY = 'locations';
const KEY = 'AIzaSyAznsByY6v2HA0h4urOTOfb99CVb_4qU-Q';
const locs = storageService.load(STORAGE_KEY) || [];

function getLoc(loc) {
  const locIdx = _IdxInCache(loc);
  let result;

  if (locIdx >= 0) {
    console.log('get location from cache');
    result = Promise.resolve(locs[locIdx]);
  } else {
    console.log('get location from server');
    result = axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${KEY}`)
      .then((res) => {
        console.log(res);
        return res.data.results[0];
      })
      .then((info) => {
        const locResult = {
          id: info.place_id,
          name: info.formatted_address,
          lat: info.geometry.location.lat,
          lng: info.geometry.location.lng,
          createdAt: Date.now(),
        };
        locs.push(locResult);
        storageService.save(STORAGE_KEY, locs);
        return locResult;
      })
      .catch((err) => console.log('Failed to Get Location from server', err));
  }
  return result;
}

function getLocs() {
  return locs;
}

function deleteLoc(id) {
  const locIdx = locs.findIndex((loc) => {
    loc.id === id;
  });
  locs.splice(locIdx, 1);
}

function _IdxInCache(searchLoc) {
  let idx = -1;
  if (locs.length) {
    idx = locs.findIndex((loc) => loc.name.toLowerCase().includes(searchLoc));
  }
  return idx;
}
