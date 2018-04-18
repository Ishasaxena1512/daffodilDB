var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var clientFeedbackModule = require('../../modules/clientFeedback');
var route = new Route('delete', '/deleteClientFeedback/:id');

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
    return clientFeedbackModule.findClientFeedback({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"clientFeedback does not exist" }); 
            }
        })
        .catch(next);
});

// find if already exist 
route.use(function(req, res, next) {
    return clientFeedbackModule.deleteClientFeedback({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedClientFeedbackId :req.params.id }); 
        })
        .catch(next);
});
