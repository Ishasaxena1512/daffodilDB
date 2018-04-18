var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var leadershipModule = require('../../modules/leadershipTeam');
var route = new Route('get', '/leadership');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return leadershipModule.getAllLeadershipMember()
        .then(function(result) {
            if (result && result.length) {
                res.leadership = result;
                return res.json({ success : true, blogs :res.leadership });
            } else {
                return res.json({ success : true, blogs :{} }); 
            }
        })
        .catch(next);
});
