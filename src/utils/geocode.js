const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=pk.eyJ1IjoiYmxhd3MwMDYiLCJhIjoiY2p0b3l1bWJsMDExZzQ0bXV6MzZtcGZubCJ9.-W5mQ8kv0LfjX6OQfS4wlg`;

  request({ url , json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if ( !body.features || body.features.length === 0 || !address) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
