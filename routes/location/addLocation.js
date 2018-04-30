var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var locationModule = require('../../modules/location');
var route = new Route('post', '/location');

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
        address : {
            type: 'string'
        },        
        contact : {
            type: 'string'
        },           
        isHeadQuartered : {
            type: 'boolean'
        },        
        images : [{
            type: 'string'
        }],        
        googleMapUrl: {
            type: 'string'
        }
    },
    required: ['title', 'address']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var title = req.body.title?req.body.title : "",
        address = req.body.address? req.body.address : "",
        contact = req.body.contact? req.body.contact : [],
        isHeadQuartered = req.body.isHeadQuartered? req.body.isHeadQuartered : false,
        images = req.body.images?  req.body.images : [],
        googleMapUrl = req.body.googleMapUrl? req.body.googleMapUrl : "";
        
    var LocationObject = {
        title,
        address,
        isHeadQuartered,
        contact,
        images,
        googleMapUrl
    };

    return locationModule.addLocation(LocationObject)
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

