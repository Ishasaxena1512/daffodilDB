var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var teamMemberModule = require('../../modules/teamMember');

var route = new Route('post', '/teamMember');

module.exports = route;
// public route
route.setPublic();

// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        designation : {
            type: 'string'
        },                
        isBoardMember : {
            type: 'boolean'
        },        
        detailInfo : {
            type: 'string'
        },        
        socialLinkscreatedAt : [{
            type: 'string'
        }],        
        image : [{
            type: 'string'
        }]
    },
    required: ['name', 'designation', 'detailInfo']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var name = req.body.name?req.body.name : "",
        designation = req.body.designation? req.body.designation : "",
        isBoardMember = req.body.isBoardMember? req.body.isBoardMember : false,
        detailInfo = req.body.detailInfo? req.body.detailInfo : "",
        image = req.body.image?  req.body.image : [],
        socialLinks = req.body.socialLinks? req.body.socialLinks : [];
    var blogObject = {
            name,
            designation,
            isBoardMember,
            detailInfo,
            image,
            socialLinks
    };

    return teamMemberModule.postTeamMember(blogObject)
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

