var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var projectModule = require('../../modules/project');
var route = new Route('get', '/getAllProjects');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return projectModule.getAllProject()
        .then(function(result) {
            if (result && result.length) {
                res.project = result;
                return res.json({ success : true, project :res.project });
            } else {
                return res.json({ success : true, project :{} }); 
            }
        })
        .catch(next);
});
