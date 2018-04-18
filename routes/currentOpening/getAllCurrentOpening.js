var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var currentOpeningModule = require('../../modules/currentOpening');
var route = new Route('get', '/getAllCurrentOpening');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return currentOpeningModule.getAllCurrentOpening()
        .then(function(result) {
            if (result && result.length) {
                res.currentOpening = result;
                return res.json({ success : true, currentOpening :res.currentOpening });
            } else {
                return res.json({ success : true, currentOpening :{} }); 
            }
        })
        .catch(next);
});
