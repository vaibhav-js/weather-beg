//forecast.js

const request = require('request')
const forecast = (address, callback) => {

    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(address) + '&appid=9b196808bceb6dd1c71bcdf5a15635b4'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.message) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, body.weather[0].main + '. It is currently approx ' + Math.ceil((body.main.temp) - 273) + '°C. '+'\nHumidity: '+body.main.humidity)
        }
    })
}
module.exports = forecast