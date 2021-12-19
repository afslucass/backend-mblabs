const Event = require("../database/Models/Event")
const crypto = require('crypto')

const postTicketByEvent = async (req, res, next) => {
    try {
        const event = await Event.findByPk(req.params.eventId)
        const ticket = await event.createTicket({
            name: req.body.name,
            email: req.body.email,
            cpf: req.body.cpf,
            code: crypto.createHash('sha256').update(Date.now() + req.body.cpf).digest('base64')
        })

        res.status(200).json(ticket)
    } catch(err) {
        res.status(500).json(err)
    }
}

const getTicketsByEvent = async (req, res, next) => {
    try {
        const event = await Event.findByPk(req.params.eventId)
        const tickets = await event.getTickets()

        res.status(200).json(tickets)
    } catch(err) {
        res.status(500).json(err)
    }
}

exports.TicketController = {
    postTicketByEvent,
    getTicketsByEvent
}