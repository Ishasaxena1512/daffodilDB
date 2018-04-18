var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var locationModule = require('../../modules/location');
var route = new Route('delete', '/location/:id');

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
    return locationModule.findLocation({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"blog does not exist" }); 
            }
        })
        .catch(next);
});

// find if already exist 
route.use(function(req, res, next) {
    return blogModule.deleteLocation({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedLocationId :req.params.id }); 
        })
        .catch(next);
});
