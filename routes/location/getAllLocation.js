var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var locationModule = require('../../modules/location');
var route = new Route('get', '/getAllLocation');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return locationModule.getAllLocation()
        .then(function(result) {
            if (result && result.length) {
                res.location = result;
                return res.json({ success : true, location :res.location });
            } else {
                return res.json({ success : true, location :{} }); 
            }
        })
        .catch(next);
});
