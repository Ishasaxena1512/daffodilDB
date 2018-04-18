var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var clientFeedbackModule = require('../../modules/clientFeedback');
var route = new Route('get', '/clientfeedback');

module.exports = route;

// public route
route.setPublic();

// find if already exist 
route.use(function(req, res, next) {
    return clientFeedbackModule.getAllClientFeedback()
        .then(function(result) {
            if (result && result.length) {
                res.clientFeedback = result;
                return res.json({ success : true, clientFeedback :res.clientFeedback });
            } else {
                return res.json({ success : true, clientFeedback :{} }); 
            }
        })
        .catch(next);
});
