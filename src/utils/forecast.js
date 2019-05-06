const request = require('request');

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/86760d9e7ddfd7d985e43e6f02effeed/${lat},${lng}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${new Date(body.currently.time)}. ${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain. Today's high will be ${body.daily.data[0].temperatureHigh} and the low will be ${body.daily.data[0].temperatureLow}.`,
      );
    }
  });
};

module.exports = forecast;
