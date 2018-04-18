var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var projectModule = require('../../modules/project');
var route = new Route('delete', '/project/:id');

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
    return projectModule.findProject({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"Project does not exist" }); 
            }
        })
        .catch(next);
});

// find if already exist 
route.use(function(req, res, next) {
    return projectModule.deleteProject({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedProjectId :req.params.id }); 
        })
        .catch(next);
});
