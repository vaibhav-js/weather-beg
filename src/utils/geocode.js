//geocode.js

const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmFpYmhhdnJhajE3IiwiYSI6ImNraXgzcHc1OTExMTQyc256bnowdHY2cGkifQ.13k0TDabIdF7q2BxJTnIRQ'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined, {
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode