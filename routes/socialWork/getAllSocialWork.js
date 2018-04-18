var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var sociaWorkModule = require('../../modules/socialWork');
var route = new Route('get', '/socialwork');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return sociaWorkModule.getAllSocialWork()
        .then(function(result) {
            if (result && result.length) {
                res.sociaWork = result;
                return res.json({ success : true, sociaWork :res.sociaWork });
            } else {
                return res.json({ success : true, sociaWork :{} }); 
            }
        })
        .catch(next);
});
