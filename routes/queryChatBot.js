var Route = require('../lib/Route');
var errors = require('../lib/errors');
var methods = require('../lib/methods');
var test = require('../lib/intentTemplateMapping2');
var sessionKeyModule = require('../modules/sessionKey');
// var HRPolicyModule = require('../../modules/hRPolicy');
var route = new Route('post', '/queryChatbot');


module.exports = route;
// public route
route.setPublic();

// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
        query : {
            type: 'string'
        },
        token : {
            type: 'string'
        }
    },
    required: ['query']

});

// creating 
route.use(function(req, res, next) {
    // console.log("1>>>>>>>>>>")
    if(req.body.token){
        sessionKeyModule.findSession({token : req.body.token})
        .then(function(response){
            if(response && response.length) {
                res.locals.token = response[0].token; 
                res.locals.context = response[0].context; 
                res.locals.addSession = false;
                return next();
            } else {
                res.locals.token = (Math.random()*1e18).toString(36);
                res.locals.context = 'defaultContext';
                res.locals.addSession = true;
                return next();
                // return next(errors.internal_error());
            }
        },function(err){
            return next(errors.internal_error());
        })
        .catch();
    } else {
        res.locals.token = (Math.random()*1e18).toString(36);
        res.locals.context = 'defaultContext';
        res.locals.addSession = true;
        return next();
    }
});

route.use(function(req, res, next) {
    // console.log("2>>>>>>>>>>")
    
    methods.getDataFromAgent(req.body.query, res.locals.token, function(err, response){
    // console.log("err, res>>>>>>>>>>>>>>>>", err, response);
        if(response) {
            res.locals.response = response;
                // console.log('>>>>>>res.locals.response', response.contexts)
            if(response.contexts && response.contexts.length){
                // console.log('>>>>>>response.result.contexts', response.contexts[0].name)
                if(response.contexts[0].name == 'client' && res.locals.context != 'client') {
                    res.locals.context = 'client';
                    res.locals.updateSession = true;
                } else if(response.contexts[0].name == 'candidate' && res.locals.context != 'candidate') {
                    res.locals.context = 'candidate';
                    res.locals.updateSession = true;
                } else {
                    // res.locals.context = 'defaultContext';
                    res.locals.updateSession = false;
                }
                return next();
                
            } else {
                res.locals.updateSession = false;
                return next();
            }
        } else {
            console.log("getDataFromAgent>>",err);
            return next(errors.internal_error());
        }
    });
});

route.use(function(req, res, next) {
    if(!res.locals.updateSession || res.locals.addSession) {
    // console.log("3>>>>>>>>>>>>>res.locals.updateSession, res.locals.addSession", res.locals.updateSession, res.locals.addSession)
        return next();
    }
    // console.log("3>>>>>>>>>>>>>")
    sessionKeyModule.findAndUpdate({token : res.locals.token}, {$set : { context : res.locals.context}})
    .then(function(response){
        return next();
    },function(err){
        return next(errors.internal_error());
    })
    .catch();
});

route.use(function(req, res, next) {
    // console.log("res.locals.addSession>>>>>>>>>>>>>", res.locals.addSession)
    if(!res.locals.addSession) {
        return next();
    }
    // console.log("4>>>>>>>>>>>>>")
    sessionKeyModule.postSession({token : res.locals.token, context : res.locals.context})
    .then(function(response){
        return next();
    },function(err){
        return next(errors.internal_error());
    })
    .catch();
});


route.use(function(req, res, next) {
    // console.log("5>>>>>>>>>>>>>")
    var responseBody = res.locals.response;
    res.locals.collection = methods.getCollection(responseBody.metadata.intentName, responseBody.parameters);
    return next();
});


route.use(function(req, res, next) {
    console.log("6>>>>>>>>>>>>>")
    var responseBody = res.locals.response;
    methods.buildQuery(responseBody.metadata.intentName, responseBody.parameters,function(response, error) {
        if(response) {
            res.locals.query = response;
            return next();
        } else {
           return next(errors.internal_error());
        }
    });
});


route.use(function(req, res, next) {
    // console.log("7>>>>>>>>>>>>>", res.locals.collection, res.locals.query)

    methods.callQuery(res.locals.collection, res.locals.query,function(DBresponse, error) {
        if(DBresponse) {
            // console.log("DBresponse>>>>>>>, ",DBresponse);
            res.locals.DBresponse = DBresponse;
            return next();
        } else {
           return next(errors.internal_error());
        }
    });
});


route.use(function(req, res, next) {
    var responseBody = res.locals.response;
    // console.log("responseBody.metadata.intentName, responseBody.contexts, res.locals.DBresponse, responseBody.parameters", responseBody)
    if(responseBody.contexts && responseBody.contexts.length){
        res.locals.template = methods.getTemplate(responseBody.metadata.intentName, responseBody.contexts[0].name, res.locals.DBresponse, responseBody.parameters);
    } else {
        res.locals.template = methods.getTemplate(responseBody.metadata.intentName, null, res.locals.DBresponse, responseBody.parameters);
    }
    console.log("res.locals.template..>", res.locals.template)
    return res.json({locals : res.locals});
});

