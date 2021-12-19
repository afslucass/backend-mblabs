const Institution = require("../database/Models/institution")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
    try {
        const institution = await Institution.create({
            cnpj: req.body.cnpj,
            name: req.body.name,
            password: req.body.password
        })

        let token = jwt.sign({
            id: institution.id,
            name: institution.name
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        institution.password = '0'
        res.status(200).json(Object.assign({}, { token: token }, institution.dataValues))
    } catch(err) {
        res.status(500).json(err)
    }
}

const login = async (req, res, next) => {
    try {
        const institution = await Institution.findOne({ where: { cnpj: req.body.cnpj } })
        let correctLogin

        if(institution !== null) {
            correctLogin = bcrypt.compareSync(req.body.password, institution.password)
        } else {
            return res.status(400).json({ message: 'O login esta errado' })
        }

        if(correctLogin != true) {
            return res.status(400).json({ message: 'A senha esta errada' })
        }

        let token = jwt.sign({
            id: institution.id,
            name: institution.name
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        institution.password = '0'
        return res.status(200).json(Object.assign({}, { token: token }, institution.dataValues))

    } catch(err) {
        res.status(500).json(err)
    }
}

exports.InstitutionController = {
    register,
    login,
}