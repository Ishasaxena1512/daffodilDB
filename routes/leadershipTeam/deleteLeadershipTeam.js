var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var leadershipModule = require('../../modules/leadershipTeam');
var route = new Route('delete', '/leadership/:id');

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
    return leadershipModule.findLeadership({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"leadership does not exist" }); 
            }
        })
        .catch(next);
});

// find if already exist 
route.use(function(req, res, next) {
    return leadershipModule.deleteLeadership({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedLeadershipId :req.params.id }); 
        })
        .catch(next);
});
