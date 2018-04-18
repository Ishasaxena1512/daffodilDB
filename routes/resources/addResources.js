var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var resourceModule = require('../../modules/resources');
var route = new Route('post', '/addResource');

module.exports = route;
// public route
route.setPublic();


// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
        type : {
            type: 'string'
        },
        name : {
            type: 'string'
        },        
        downloadLink : {
            type: 'string'
        }
    },
    required: ['name', 'downloadLink']
});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var type = req.body.type?req.body.type : "",
        name = req.body.name?  req.body.name : "",
        downloadLink = req.body.downloadLink? req.body.downloadLink : [];
       
    var resourceObject = {
        type,
        name,
        downloadLink
    };

    return resourceModule.postResource(resourceObject)
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

