var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var daffodilModule = require('../../modules/daffodil');
var route = new Route('post', '/addDaffodil');

module.exports = route;
// public route
route.setPublic();

// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
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
    required: ['aboutUs', 'employeeSize']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var title = req.body.title?req.body.title : "",
        description = req.body.description? req.body.description : "",
        overview = req.body.overview? req.body.overview : "",
        highlights = req.body.highlights? req.body.highlights : "",
        domain = req.body.domain? req.body.domain : "",
        usp = req.body.usp? req.body.usp : "",
        platform = req.body.platform? req.body.platform : [],
        clientInfo = req.body.clientInfo? req.body.clientInfo : "",
        images = req.body.images? req.body.images : [],
        url = req.body.url? req.body.url : [],
        teamSize = req.body.teamSize? req.body.teamSize : "",
        clientFeedback = req.body.clientFeedback? req.body.clientFeedback : [],
        timespan = req.body.timespan? req.body.timespan : "",
        frontendTechnology = req.body.frontendTechnology? req.body.frontendTechnology : [],
        backendTechnology = req.body.backendTechnology? req.body.backendTechnology : [],
        thirdPartyApis = req.body.thirdPartyApis?  req.body.thirdPartyApis : [],
        deployedOn = req.body.deployedOn? req.body.deployedOn : "";
        
    var daffodilObject = {
        title,
        description,
        overview,
        highlights,
        domain,
        usp, 
        platform,
        clientInfo,
        images,
        url,
        teamSize,
        clientFeedback, 
        timespan,
        frontendTechnology,
        backendTechnology,
        thirdPartyApis,
        deployedOn
    };

    return daffodilModule.postDaffodil(daffodilObject)
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

