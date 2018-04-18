var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var thirdPartyApiModule = require('../../modules/thirdPartyApis');
var route = new Route('post', '/thirdpartyapi');

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
        description : {
            type: 'string'
        },        
        techonologyUsed : [{
            type: 'string'
        }],        
        projectGlimpse : [{
            type: 'string'
        }]
    },
    required: ['name', 'description']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var name = req.body.name?req.body.name : "",
        description = req.body.description? req.body.description : "",
        techonologyUsed = req.body.techonologyUsed?  req.body.techonologyUsed : [],
        projectGlimpse = req.body.projectGlimpse? req.body.projectGlimpse : [];
        
    var blogObject = {
        name,
        description,
        techonologyUsed,
        projectGlimpse
    };

    return thirdPartyApiModule.postThirdPartyApi(blogObject)
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

