var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var careerModule = require('../../modules/careers');
var route = new Route('get', '/getAllBugs');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return careerModule.getAllCareers()
        .then(function(result) {
            if (result && result.length) {
                res.Careers = result;
                return res.json({ success : true, Careers :res.Careers });
            } else {
                return res.json({ success : true, Careers :{} }); 
            }
        })
        .catch(next);
});
