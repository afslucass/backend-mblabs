const Event = require("./Models/Event");
const ImagesUrl = require("./Models/imagesUrl");
const Institution = require("./Models/institution");
const Ticket = require("./Models/ticket");

Institution.hasMany(Event)
Event.belongsTo(Institution)

Event.hasMany(Ticket)
Ticket.belongsTo(Event)

Event.hasMany(ImagesUrl)
ImagesUrl.belongsTo(Event)

Event.sync()
Institution.sync()
Ticket.sync()
ImagesUrl.sync()