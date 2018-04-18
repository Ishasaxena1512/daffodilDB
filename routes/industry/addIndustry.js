var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var industryModule = require('../../modules/industry');
var route = new Route('post', '/industry');

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
        overview : {
            type: 'string'
        },        
        glimpseOfProjects : [{
            type: 'string'
        }],        
        paper : [{
            type: 'string'
        }],
        clientFeedbacks: [{
            type: 'string'
        }]
    },
    required: ['description', 'title']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var title = req.body.title?req.body.title : "",
        description = req.body.description? req.body.description : "",
        overview = req.body.overview? req.body.overview : "",
        glimpseOfProjects = req.body.glimpseOfProjects? req.body.glimpseOfProjects : [],
        paper = req.body.paper?  req.body.paper : [],
        clientFeedbacks = req.body.clientFeedbacks? req.body.clientFeedbacks : [];
        
    var industryObject = {
        title,
        description,
        overview,
        glimpseOfProjects,
        paper,
        clientFeedbacks
    };

    return industryModule.postIndustry(industryObject)
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

