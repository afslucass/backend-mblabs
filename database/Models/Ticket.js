const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../connection')

const Ticket = sequelize.define('Ticket', {
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    cpf: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            is: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
        }
    }
})

module.exports = Ticket