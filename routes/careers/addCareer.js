var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var careerModule = require('../../modules/careers');
var route = new Route('post', '/career');

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
    },
    required: ['benefits']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var benefits = req.body.benefits?req.body.benefits : [],
        currentOpening = req.body.currentOpening?  req.body.currentOpening : [];
        
    var careerObject = {
        benefits,
        currentOpening
    };

    return careerModule.postCareer(careerObject)
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

