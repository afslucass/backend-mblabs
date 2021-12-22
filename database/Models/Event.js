
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../connection')

const Event = sequelize.define('Event', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    cep: {
        type: DataTypes.STRING(20),
    },
    address: {
        type: DataTypes.STRING,
    },
    number: {
        type: DataTypes.STRING(10),
    },
    city: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    region: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
            notEmpty: true
        }
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
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    participantsLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    participants: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.STRING(5000)
    },
    backgroundUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Event