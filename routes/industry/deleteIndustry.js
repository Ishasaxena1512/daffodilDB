var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var industryModule = require('../../modules/industry');
var route = new Route('delete', '/deleteIndustry/:id');

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
    return industryModule.findIndustry({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"Industry does not exist" }); 
            }
        })
        .catch(next);
});

// find if already exist 
route.use(function(req, res, next) {
    return blogModule.deleteIndustry({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedIndustryId :req.params.id }); 
        })
        .catch(next);
});
