require('dotenv').config()
const express = require('express')
const router = require('./router/router')
const bodyParser = require('body-parser');

require('./database/syncModels')

const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(router)

app.listen(process.env.PORT, () => {
    console.log('A API esta rodando!')
})