// import the actions model!!
const Artwork = require('../models/Artwork');

// middleware to validate the action id
function validatePayload(req, res, next) {
    if (req.body.title && req.body.img && req.body.keyword && req.body.size && req.body.description && req.body.price && req.body.buy && req.body.podLink) {
        next();
    } else {
        res.status(400).json({ message: 'missing required fields' })
    }
}

// middleware to validate the action
function validatePayloadTypes(req, res, next) {
    //if the action is missing any of the required fields, send back status 400 and message
    if( typeof req.body.description != 'string' 
        || req.body.description == ''
        || typeof req.body.title != 'string'
        || req.body.title == ''
        || typeof req.body.price != 'number') {
            res.status(400).json({ message: 'missing required fields or incorrect value types' })
            return;
        } else {
            next();
        }
}

//export the middleware!!
module.exports = {
    validatePayload,
    validatePayloadTypes
};