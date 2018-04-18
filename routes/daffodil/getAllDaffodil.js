var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var daffodilModule = require('../../modules/daffodil');
var route = new Route('get', '/daffodil');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return daffodilModule.getAllInfo()
        .then(function(result) {
            if (result && result.length) {
                res.daffodil = result;
                return res.json({ success : true, daffodil :res.daffodil });
            } else {
                return res.json({ success : true, daffodil :{} }); 
            }
        })
        .catch(next);
});
