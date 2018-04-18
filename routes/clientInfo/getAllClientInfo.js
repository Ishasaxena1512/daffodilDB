var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var clientInfoModule = require('../../modules/clientInfo');
var route = new Route('get', '/clientinfo');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return clientInfoModule.getAllClientInfo()
        .then(function(result) {
            if (result && result.length) {
                res.clientInfo = result;
                return res.json({ success : true, clientInfo :res.clientInfo });
            } else {
                return res.json({ success : true, clientInfo :{} }); 
            }
        })
        .catch(next);
});
