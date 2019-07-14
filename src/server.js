const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cheerio = require('cheerio')
const routes = require('./routes')
const path = require('path')
require("dotenv").config()


app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use('/', routes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running @ port ${process.env.PORT}`)
})
