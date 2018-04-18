var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var projectModule = require('../../modules/project');
var route = new Route('put', '/editProject/:id');

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
        usp : {
            type: 'string'
        },        
        platform : {
            type: 'string'
        },        
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
        frontendTechnology : {
            type: 'string'
        },
        backendTechnology: {
            type: 'string'
        },        
        thirdPartyApis : {
            type: 'string'
        },
        deployedOn: {
            type: 'string'
        }
    },
    required: ['title', 'description']

});
// find if already exist 
route.use(function(req, res, next) {
    return projectModule.findProject({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"Project does not exist" }); 
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

    return projectModule.findAndUpdate({ _id : req.params.id}, updateObj)
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

