var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var resourceModule = require('../../modules/resources');
var route = new Route('get', '/getAllResource');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return resourceModule.getAllResource()
        .then(function(result) {
            if (result && result.length) {
                res.resource = result;
                return res.json({ success : true, resource :res.resource });
            } else {
                return res.json({ success : true, resource :{} }); 
            }
        })
        .catch(next);
});
