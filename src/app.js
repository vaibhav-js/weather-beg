const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 8080

// Path defined
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

// Setup satatuc directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vaibhav Raj Saxena'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Vaibhav Raj Saxena'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Vaibhav Raj Saxena'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })
    }
    geocode(req.query.address, (error, { location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(req.query.address, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address,
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        text: 'Help page not found',
        name: 'Vaibhav Raj Saxena'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404 :(',
        text: '404 error. Page not found.',
        name: 'Vaibhav Raj Saxena'
    })
})


app.listen(port, () => {
    console.log('Server is on port ' + port + "..")
})
