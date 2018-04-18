var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var careerModule = require('../../modules/careers');
var route = new Route('delete', '/deleteCareer/:id');

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
    return careerModule.findCareer({ _id : req.params.id})
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
    return careerModule.deleteCareer({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedCareerId :req.params.id }); 
        })
        .catch(next);
});
