
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../connection')
const bcrypt = require('bcrypt')

const Institution = sequelize.define('Institution', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            is: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/ // 00.000.000/0000-00
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, 10))
        }
    }
})

module.exports = Institution