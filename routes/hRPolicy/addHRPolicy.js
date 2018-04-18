var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var HRPolicyModule = require('../../modules/hRPolicy');
var route = new Route('post', '/hrpolicy');

module.exports = route;
// public route
route.setPublic();

// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
        title : {
            type: 'string'
        },
        type : {
            type: 'string'
        },        
        active : {
            type: 'string'
        },        
        description : {
            type: 'string'
        }
    },
    required: ['title', 'description']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var title = req.body.title?req.body.title : "",
        type = req.body.type?  req.body.type : "",
        active = req.body.active? req.body.active : true,
        description = req.body.description? req.body.description : "";
        
    var HRPolicyObject = {
        title,
        type,
        active,
        description
    };

    return HRPolicyModule.postHRPolicy(HRPolicyObject)
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

