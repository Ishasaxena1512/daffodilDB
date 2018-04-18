var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var HRPolicyModule = require('../../modules/hRPolicy');
var route = new Route('delete', '/deleteHRPolicy/:id');

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
    return HRPolicyModule.findHRPolicy({ _id : req.params.id})
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
    return HRPolicyModule.deleteHRPolicy({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedHRPolicyId :req.params.id }); 
        })
        .catch(next);
});
