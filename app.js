require('dotenv').config()
const express = require('express')
const router = require('./router/router')

require('./database/syncModels')

const app = express()

app.use(router)

app.listen(process.env.PORT, () => {
    console.log('A API esta rodando!')
})