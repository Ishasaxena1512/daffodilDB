var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var technologyModule = require('../../modules/technology');
var route = new Route('post', '/technology');

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
        version : {
            type: 'string'
        },        
        description : {
            type: 'string'
        },        
        overview : {
            type: 'string'
        },
        glimpseOfProjects: [{
            type: 'string'
        }],
        recommenedReading: {
            type: 'string'
        }
    },
    required: ['description', 'title']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body);
    var title = req.body.title?req.body.title : "",
        type = req.body.type? req.body.type : "",
        version = req.body.version? req.body.version : "",
        description = req.body.description? req.body.description : "",
        overview = req.body.overview? req.body.overview : "",
        glimpseOfProjects = req.body.glimpseOfProjects?  req.body.glimpseOfProjects : [],
        recommenedReading = req.body.recommenedReading? req.body.recommenedReading : [];
    var blogObject = {
        title,
        type,
        version,
        description,
        overview,
        glimpseOfProjects,
        recommenedReading
    };

    return technologyModule.postTechnology(blogObject)
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

