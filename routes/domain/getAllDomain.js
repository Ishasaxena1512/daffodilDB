var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var domainModule = require('../../modules/domain');
var route = new Route('get', '/getAllDomain');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return domainModule.getAllBlogs()
        .then(function(result) {
            if (result && result.length) {
                res.domain = result;
                return res.json({ success : true, domain :res.domain });
            } else {
                return res.json({ success : true, domain :{} }); 
            }
        })
        .catch(next);
});
