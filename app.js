require('dotenv').config()
const express = require('express')
const router = require('./router/router')
const bodyParser = require('body-parser');
const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

require('./database/syncModels')

const app = express()

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(router)

app.listen(process.env.PORT, () => {
    console.log('A API esta rodando!')
})