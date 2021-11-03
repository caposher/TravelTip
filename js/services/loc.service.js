export const locService = {
  getLocs,
};

const locs = [
  {
    id: 1,
    name: 'Greatplace',
    lat: 32.047104,
    lng: 34.832384,
    weather: 1,
    createdAt: Date.now(),
    updatedAt: Date.now() - 1000,
  },

  //   { id: 2, name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
];

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000);
  });
}
