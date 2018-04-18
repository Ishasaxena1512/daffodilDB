var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var HRPolicyModule = require('../../modules/hRPolicy');
var route = new Route('get', '/hrpolicy');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return HRPolicyModule.getAllHRPolicy()
        .then(function(result) {
            if (result && result.length) {
                res.HRPolicy = result;
                return res.json({ success : true, HRPolicy :res.HRPolicy });
            } else {
                return res.json({ success : true, HRPolicy :{} }); 
            }
        })
        .catch(next);
});
