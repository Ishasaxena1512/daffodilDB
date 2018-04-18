var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var domainModule = require('../../modules/domain');
var route = new Route('post', '/addDomain');

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
        glimpseOfprojects : [{
            type: 'string'
        }],        
        paper : [{
            type: 'string'
        }],
        clientFeedbacks: [{
            type: 'string'
        }]
    },
    required: ['title', 'description']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var title = req.body.title?req.body.title : "",
        description = req.body.description? req.body.description : "",
        overview = req.body.overview? req.body.overview : "",
        glimpseOfprojects = req.body.glimpseOfprojects? req.body.glimpseOfprojects : [],
        paper = req.body.paper?  req.body.paper : [],
        clientFeedbacks = req.body.clientFeedbacks? req.body.clientFeedbacks : [];
       
    var domainObject = {
        title,
        description,
        overview,
        glimpseOfprojects,
        paper,
        clientFeedbacks
    };

    return domainModule.postDomain(domainObject)
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

