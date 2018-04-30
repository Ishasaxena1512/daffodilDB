var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var projectModule = require('../../modules/project');
var route = new Route('post', '/project');

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
        description : {
            type: 'string'
        },
        overview: {
            type: 'string'
        },
        highlights : {
            type: 'string'
        },
        domain : {
            type: 'string'
        },                
        industry : {
            type: 'string'
        },        
        usp : {
            type: 'string'
        },        
        platform : [{
            type: 'string'
        }],        
        clientInfo : {
            type: 'string'
        },
        images: {
            type: 'string'
        },
        url : {
            type: 'string'
        },
        teamSize : {
            type: 'string'
        },        
        clientFeedback : {
            type: 'string'
        },        
        timespan : {
            type: 'string'
        },        
        frontendTechnology : [{
            type: 'string'
        }], 
        allTechnologies : [{
            type: 'string'
        }],
        backendTechnology: [{
            type: 'string'
        }],        
        thirdPartyApis : [{
            type: 'string'
        }],
        deployedOn: {
            type: 'string'
        }
    },
    required: ['title', 'description']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var title = req.body.title?req.body.title : "",
        description = req.body.description? req.body.description : "",
        overview = req.body.overview? req.body.overview : "",
        highlights = req.body.highlights? req.body.highlights : "",
        industry = req.body.industry? req.body.industry : "",
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
        allTechnologies = frontendTechnology.push(backendTechnology),
        thirdPartyApis = req.body.thirdPartyApis?  req.body.thirdPartyApis : [],
        deployedOn = req.body.deployedOn? req.body.deployedOn : "";
    var blogObject = {
        title,
        description,
        overview,
        highlights,
        domain,
        industry,
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
        allTechnologies,
        thirdPartyApis,
        deployedOn
    };

    return projectModule.addProject(blogObject)
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

