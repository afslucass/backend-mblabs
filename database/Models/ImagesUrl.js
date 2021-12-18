const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../connection')

const ImagesUrl = sequelize.define('ImagesUrl', {
    url: {
        type: DataTypes.STRING
    }
})

module.exports = ImagesUrl