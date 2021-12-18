
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../connection')

const Event = sequelize.define('Event', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    region: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    parentalRating: {
        type: DataTypes.INTEGER,
        defaultValue: 0 // TODOS OS PUBLICOS
    },
    startDate: {
        type: DataTypes.DATEONLY,
    },
    finishDate: {
        type: DataTypes.DATEONLY,
    },
    ticketPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    participantsLimit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(5000)
    },
    backgroundUrlId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Event