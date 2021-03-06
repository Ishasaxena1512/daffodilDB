var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var domainModule = require('../../modules/domain');
var route = new Route('delete', '/domain/:id');

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
    return domainModule.findDomain({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"domain does not exist" }); 
            }
        })
        .catch(next);
});

// find if already exist 
route.use(function(req, res, next) {
    return domainModule.deleteDomain({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedDomainId :req.params.id }); 
        })
        .catch(next);
});
