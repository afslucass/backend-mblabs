const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../connection')

const Ticket = sequelize.define('Ticket', {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    cpf: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            is: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
            notEmpty: true
        },
        unique: true
    }
})

module.exports = Ticket