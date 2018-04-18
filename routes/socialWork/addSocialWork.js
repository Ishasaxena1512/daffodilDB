var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var sociaWorkModule = require('../../modules/socialWork');
var route = new Route('post', '/socialwork');

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
        detail : {
            type: 'string'
        },        
        focusArea : {
            type: 'string'
        }
    },
    required: ['title', 'detail']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var title = req.body.title?req.body.title : "",
        detail = req.body.detail?  req.body.detail : "",
        focusArea = req.body.focusArea? req.body.focusArea : [];
        
    var sociaWorkObject = {
        title,
        detail,
        focusArea
    };

    return sociaWorkModule.postSocialWork(sociaWorkObject)
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


