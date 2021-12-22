const Event = require("../database/Models/Event")
const crypto = require('crypto')
const Ticket = require("../database/Models/Ticket")

const postTicketByEvent = async (req, res, next) => {
    try {
        const event = await Event.findByPk(req.params.eventId)
        const ticket = await event.createTicket({
            name: req.body.name,
            email: req.body.email,
            cpf: req.body.cpf,
            code: crypto.createHash('sha256').update(Date.now() + req.body.cpf).digest('base64')
        })

        event.participants += 1
        event.save()

        res.status(200).json(ticket)
    } catch(err) {
        res.status(500).json(err)
    }
}

const getTicketsByEvent = async (req, res, next) => {
    try {
        const event = await Event.findByPk(req.params.eventId, {
            include: Ticket,
            order: [
                [Ticket, 'name', 'ASC']
            ]
        })

        res.status(200).json(event)
    } catch(err) {
        res.status(500).json(err)
    }
}

exports.TicketController = {
    postTicketByEvent,
    getTicketsByEvent
}