var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var clientInfoModule = require('../../modules/clientInfo');
var route = new Route('post', '/addClientInfo');

module.exports = route;
// public route
route.setPublic();

// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
        name : {
            type: 'string'
        },
        about : {
            type: 'string'
        },        
        projectAssociated : {
            type: 'string'
        }
    },
    required: ['name', 'about']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var name = req.body.name?req.body.name : "",
        about = req.body.about?  req.body.about : "",
        projectAssociated = req.body.projectAssociated? req.body.projectAssociated : [];
        
    var clientInfoObject = {
        name,
        about,
        projectAssociated
    };

    return clientInfoModule.postClientInfo(clientInfoObject)
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

