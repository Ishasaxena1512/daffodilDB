var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var leadershipModule = require('../../modules/leadershipTeam');
var route = new Route('put', '/leadership/:id');

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
        designation : {
            type: 'string'
        },        
        detailInfo : {
            type: 'string'
        },        
        images : {
            type: 'string'
        },        
        socialLinks : {
            type: 'string'
        }
    }

});// find if already exist 
route.use(function(req, res, next) {
    return leadershipModule.findLeadership({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"leadership does not exist" }); 
            }
        })
        .catch(next);
});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var updateObj = {};
    Object.keys(req.body).forEach((key)=> {
        // console.log("item>>", key);
        updateObj[key] = req.body[key]
    });

    return leadershipModule.findAndUpdate({ _id : req.params.id}, updateObj)
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

