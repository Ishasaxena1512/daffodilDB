var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var daffodilModule = require('../../modules/daffodil');
var route = new Route('post', '/daffodil');

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
        aboutUs : {
            type: 'string'
        },
        employeeSize : {
            type: 'string'
        },  
        awards : [{
            type: 'string'
        }],
        industries : [{
            type: 'string'
        }],  
        hrPolicy : [{
            type: 'string'
        }],
        domain : [{
            type: 'string'
        }],  
        webTechnology : [{
            type: 'string'
        }],
        mobileTechnology : [{
            type: 'string'
        }],  
        location : [{
            type: 'string'
        }],
        contact : [{
            type: 'string'
        }],  
        email : [{
            type: 'string'
        }],
        clients : [{
            type: 'string'
        }],  
        blogs : [{
            type: 'string'
        }],
        boardMembers : [{
            type: 'string'
        }],  
        leadershipTeam : [{
            type: 'string'
        }],
        resources : [{
            type: 'string'
        }],  
        careers : [{
            type: 'string'
        }],
        socialWork : [{
            type: 'string'
        }],  
        socialNetworkLinks : [{
            type: 'string'
        }],
        projects : [{
            type: 'string'
        }],  
        videosLink : [{
            type: 'string'
        }],
        images : [{
            type: 'string'
        }],        
        thirdPartyApis : [{
            type: 'string'
        }]
    },
    required: ['name', 'aboutUs']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var name = req.body.name?req.body.name : "",
        aboutUs = req.body.aboutUs? req.body.aboutUs : "",
        employeeSize = req.body.employeeSize? req.body.employeeSize : 0,
        awards = req.body.awards? req.body.awards : [],
        industries = req.body.industries? req.body.industries : [],
        hrPolicy = req.body.hrPolicy? req.body.hrPolicy : [],
        domain = req.body.domain? req.body.domain : [],
        webTechnology = req.body.webTechnology? req.body.webTechnology : [],
        mobileTechnology = req.body.mobileTechnology? req.body.mobileTechnology : [],
        location = req.body.location? req.body.location : [],
        contact = req.body.contact? req.body.contact : [],
        email = req.body.email? req.body.email : [],
        clients = req.body.clients? req.body.clients : [],
        blogs = req.body.blogs? req.body.blogs : [],
        boardMembers = req.body.boardMembers? req.body.boardMembers : [],
        leadershipTeam = req.body.leadershipTeam?  req.body.leadershipTeam : [],
        resources = req.body.resources? req.body.resources : [],
        careers = req.body.careers? req.body.careers : [],
        socialWork = req.body.socialWork? req.body.socialWork : [],
        socialNetworkLinks = req.body.socialNetworkLinks? req.body.socialNetworkLinks : [],
        projects = req.body.projects? req.body.projects : [],
        videosLink = req.body.videosLink?  req.body.videosLink : [],
        images = req.body.images?  req.body.images : [],
        thirdPartyApis = req.body.thirdPartyApis? req.body.thirdPartyApis : [];
        
    var daffodilObject = {
        name,
        aboutUs,
        employeeSize,
        awards,
        industries,
        hrPolicy,
        domain,
        webTechnology,
        mobileTechnology,
        location,
        contact,
        email,
        clients,
        blogs,
        boardMembers,
        leadershipTeam,
        resources,
        careers,
        socialWork,
        socialNetworkLinks,
        projects,
        videosLink,
        images,
        thirdPartyApis
    };

    return daffodilModule.addData(daffodilObject)
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

