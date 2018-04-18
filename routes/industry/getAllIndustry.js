var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var industryModule = require('../../modules/industry');
var route = new Route('get', '/industry');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return industryModule.getAllIndustry()
        .then(function(result) {
            if (result && result.length) {
                res.Industry = result;
                return res.json({ success : true, Industry :res.Industry });
            } else {
                return res.json({ success : true, Industry :{} }); 
            }
        })
        .catch(next);
});
