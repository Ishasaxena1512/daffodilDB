var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var sociaWorkModule = require('../../modules/socialWork');
var route = new Route('post', '/addSocialWork');

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
    required: ['detail', 'title']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var type = req.body.type?req.body.type : "",
        name = req.body.name?  req.body.name : "",
        downloadLink = req.body.downloadLink? req.body.downloadLink : [];
        
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


