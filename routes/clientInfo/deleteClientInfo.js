var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var clientInfoModule = require('../../modules/clientInfo');
var route = new Route('delete', '/deleteClientInfo/:id');

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
    return clientInfoModule.findClientInfo({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"clientInfo does not exist" }); 
            }
        })
        .catch(next);
});

// find if already exist 
route.use(function(req, res, next) {
    return clientInfoModule.deleteClientInfo({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedClientInfoId :req.params.id }); 
        })
        .catch(next);
});
