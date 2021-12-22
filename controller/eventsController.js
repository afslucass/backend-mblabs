const { Op } = require("sequelize")
const Event = require("../database/Models/Event")
const ImagesUrl = require("../database/Models/ImagesUrl")
const Institution = require("../database/Models/institution")

const getEvents = async (req, res, next) => {
    try {
        const events = await Event.findAll({ order: [[ 'createdAt', 'ASC' ]], limit: 10, include: ImagesUrl})

        res.status(200).json(events)
    } catch(err) {
        res.status(500).json(err)
    }
}

const getEventsBySearch = async (req, res, next) => {
    try {
        const events = await Event.findAll({ order: [[ 'createdAt', 'DESC' ]], limit: 10, where: {
            name: {
                [Op.substring]: `${req.body.search}`
            }
        }, include: [ImagesUrl, { model: Institution, attributes: ['name'] }]})

        res.status(200).json(events)
    } catch(err) {
        res.status(500).json(err)
    }
}

const getEventById = async (req, res, next) => {
    try {
        const events = await Event.findByPk(req.params.eventId, {
            include: [ImagesUrl, { model: Institution, attributes: ['name'] }]
        })

        res.status(200).json(events)
    } catch(err) {
        res.status(500).json(err)
    }
}

const getEventsByInstitution = async (req, res, next) => {
    try {
        const institution = await Institution.findByPk(req.query.idByToken, {
            include: {
                model: Event,
            },
            order: [
                [Event, 'createdAt', 'DESC']
            ]
        })

        res.status(200).json(institution)
    } catch(err) {
        res.status(500).json(err)
    }
}

const postEventByInstitution = async (req, res, next) => {
    try {

        if(!req.files['background']) {
            return res.status(400).json({ errors: [{ message: 'Deve haver uma imagem de fundo' }] })
        }

        const institution = await Institution.findByPk(req.query.idByToken)
        if(institution === null) {
            return res.status(400).json({ errors: [{ message: 'No institution with that id' }] })
        }

        const event = await institution.createEvent({
            name: req.body.name,
            cep: req.body.cep,
            city: req.body.city,
            address: req.body.address,
            number: req.body.number,
            region: req.body.region, 
            parentalRating: req.body.parentalRating, 
            startDate: req.body.startDate,
            finishDate: req.body.finishDate,
            ticketPrice: req.body.ticketPrice,
            participantsLimit: req.body.participantsLimit,
            participants: 0,
            description: req.body.description,
            backgroundUrl: req.files['background'][0].filename
        })

        if(req.files['photos']) {
            req.files['photos'].forEach(async element => {
                await event.createImagesUrl({ url: element.filename })
            });
        }

        res.status(200).json(event)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const putEventById = async (req, res, next) => {
    try {
        console.log(req.file)
        let event = await Event.findByPk(req.params.eventId, { include: ImagesUrl })
    
        event.cidade = req.body.cidade
        event.region = req.body.region
        event.city = req.body.city
        event.name = req.body.name
        event.address = req.body.address
        event.cep = req.body.cep
        event.number = req.body.number
        event.parentalRating = req.body.parentalRating
        if(req.body.startDate <0) {
            event.startDate = req.body.startDate
        }
        if(req.body.finishDate <0) {
            event.finishDate = req.body.finishDate
        }
        event.ticketPrice = req.body.ticketPrice
        event.participantsLimit = req.body.participantsLimit
        event.description = req.body.description
    
        if(req.file) {
            event.backgroundUrl = req.file.filename
        }

        await event.save()

        res.status(200).json(event)
    } catch(err) {
        res.status(500).json(err)
    }
}

exports.EventsController = {
    getEventById,
    getEvents,
    getEventsByInstitution,
    getEventsBySearch,
    postEventByInstitution,
    putEventById
}