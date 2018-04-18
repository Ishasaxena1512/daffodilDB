var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var currentOpeningModule = require('../../modules/currentOpening');
var route = new Route('delete', '/currentopening/:id');

module.exports = route;

// public route
route.setPublic();

// validate input 
route.validateInputParams({
    type: 'object',
    properties: {
        id: { type: 'string' }
    }, required: ['id']
});

// find if already exist 
route.use(function(req, res, next) {
    return currentOpeningModule.findCurrentOpening({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"currentOpening does not exist" }); 
            }
        })
        .catch(next);
});

// find if already exist 
route.use(function(req, res, next) {
    return currentOpeningModule.deleteCurrentOpening({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedCurrentOpeningId :req.params.id }); 
        })
        .catch(next);
});
