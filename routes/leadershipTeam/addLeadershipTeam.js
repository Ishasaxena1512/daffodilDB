var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var leadershipModule = require('../../modules/leadershipTeam');
var route = new Route('post', '/leadership');

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
    },
    required: ['name', 'designation', 'detailInfo']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var name = req.body.name?req.body.name : "",
        designation = req.body.designation? req.body.designation : "",
        detailInfo = req.body.detailInfo? req.body.detailInfo : "",
        images = req.body.images?  req.body.images : [],
        socialLinks = req.body.socialLinks? req.body.socialLinks : [];
        
    var leadershipObject = {
        name,
        designation,
        detailInfo,
        images,
        socialLinks
    };

    return leadershipModule.addLeadershipMember(leadershipObject)
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

