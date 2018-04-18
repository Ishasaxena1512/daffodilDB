var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var clientFeedbackModule = require('../../modules/clientFeedback');
var route = new Route('post', '/clientfeedback');

module.exports = route;
// public route
route.setPublic();

// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
               
        feedback : [{
            type: 'string'
        }],        
        clientId : {
            type: 'string'
        },
        projectId: {
            type: 'string'
        }
    },
    required: ['feedback', 'clientId', 'projectId']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var feedback = req.body.feedback?req.body.feedback : [],
        clientId = req.body.clientId?  req.body.clientId : "",
        projectId = req.body.projectId? req.body.projectId : "";
    var clientFeedbackObject = {
        feedback,
        clientId,
        projectId
    };

    return clientFeedbackModule.postClientFeedback(clientFeedbackObject)
        .then(function(result) {
            if (result) {
                return res.json({'success' : true, 'result' : result});
            } else {
                return res.json({ success : true, 'result' :{} }); 
            }
        }, function(err) {
            console.log("err", err);
            return res.json({ success : false, details : err });
        })
        .catch(next);
});

