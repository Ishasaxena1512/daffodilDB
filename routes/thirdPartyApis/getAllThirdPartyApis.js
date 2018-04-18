var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var thirdPartyApiModule = require('../../modules/thirdPartyApis');
var route = new Route('get', '/thirdpartyapi');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return thirdPartyApiModule.getAllThirdPartyApi()
        .then(function(result) {
            if (result && result.length) {
                res.blogs = result;
                return res.json({ success : true, blogs :res.blogs });
            } else {
                return res.json({ success : true, blogs :{} }); 
            }
        })
        .catch(next);
});
