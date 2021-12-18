const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('mblabs', process.env.DBUSER, process.env.DBPASSWORD, {
    dialect: 'mysql'
})

module.exports = sequelize