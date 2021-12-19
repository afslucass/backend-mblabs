
const express = require('express')
const multer = require('multer')
const { EventsController } = require('../controller/eventsController')
const { ImageUrlController } = require('../controller/imageUrlController')
const { InstitutionController } = require('../controller/institutionController')
const { TicketController } = require('../controller/ticketController')
const { AuthMiddleWare } = require('../middleware/auth')

var router = express.Router()
const upload = multer({
    dest: './upload/',
})

router.post('/institution/register', InstitutionController.register)
router.post('/institution/login', InstitutionController.login)

router.get('/events', EventsController.getEvents)
router.post('/events-by-search', EventsController.getEventsBySearch)
router.get('/events-by-event-id/:eventId', EventsController.getEventById)

router.post('/ticket/:eventId', TicketController.postTicketByEvent)

router.get('/image/:filename', ImageUrlController.getImageByUrl)

router.use(AuthMiddleWare.check)

router.delete('/image/:eventId/:filename', ImageUrlController.removeImageByUrl)
router.post('/image/:eventId', upload.single('photo'), ImageUrlController.addImageByEvent)

router.get('/events-by-institution-id', EventsController.getEventsByInstitution) // JWT
router.post('/events', upload.fields([ { name: 'background', maxCount: 1 }, { name: 'photos', maxCount: 10 } ]), EventsController.postEventByInstitution) // JWT
router.put('/events/:eventId', upload.fields([ { name: 'background', maxCount: 1 }, { name: 'photos', maxCount: 10 } ]), EventsController.putEventById) // JWT

router.get('/ticket/:eventId', TicketController.getTicketsByEvent) // JWT

module.exports = router