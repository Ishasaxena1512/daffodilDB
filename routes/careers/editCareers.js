var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var careerModule = require('../../modules/careers');
var route = new Route('put', '/career/:id');

module.exports = route;
// public route
route.setPublic();
// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
        benefits : [{
            type: 'string'
        }],
        currentOpening: {
            type: 'string'
        }
    }

});
// find if already exist 
route.use(function(req, res, next) {
    return careerModule.findCareer({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"career does not exist" }); 
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

    return careerModule.findAndUpdate({ _id : req.params.id}, updateObj)
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

