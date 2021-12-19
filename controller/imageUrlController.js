
const path = require('path')
const Event = require('../database/Models/Event')
const ImagesUrl = require('../database/Models/ImagesUrl')

const getImageByUrl = async (req, res, next) => {
    try {
        res.sendFile(path.resolve(__dirname, '..', 'upload', req.params.filename), {
            headers: {
                'Content-Type': 'image/jpeg'
            }
        })
    } catch(err) {
        res.status(500).json(err)
    }
}

const removeImageByUrl = async (req, res, next) => {
    try {
        const event = await Event.findByPk(req.params.eventId)
        const photos = await event.getImagesUrls()
        if(photos.length == 0) {
            res.status(400).json({ message: 'O evento nao contem fotos' })
        }

        photos.forEach(async element => {
            if(element.url == req.params.filename) {
                await event.removeImagesUrl(element)
            }
        });
        res.status(200).json({})
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const addImageByEvent = async (req, res, next) => {
    try {
        const event = await Event.findByPk(req.params.eventId)
        const img = await event.createImagesUrl({
            url: req.file.filename
        })
        res.status(200).json(img)
    } catch(err) {
        res.status(500).json(err)
    }
}

exports.ImageUrlController = {
    getImageByUrl,
    removeImageByUrl,
    addImageByEvent
}