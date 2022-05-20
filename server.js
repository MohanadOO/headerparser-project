var express = require('express')
var app = express()
const path = require('path')
const { lookup } = require('geoip-lite')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')

// your first API endpoint...
app.get('/', (req, res) => {
  res.render(path.join(__dirname + '/views/index.ejs'))
})

app.get('/api/whoami', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const language = req.headers['accept-language']
  const software = req.headers['user-agent']

  res.json({
    ipaddress: ip,
    language: language,
    software: software,
    location: lookup(ip),
  })
})

// listen for requests :)
app.listen(5500 || process.env.PORT)
