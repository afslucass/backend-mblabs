const Institution = require("../database/Models/institution")

const register = (req, res, next) => {
    try {
        
    } catch(err) {
        res.json(err).status(500)
    }
}

const login = (req, res, next) => {

}

const logout = async (req, res, next) => {

}

exports.InstitutionController = {
    register,
    login,
    logout
}