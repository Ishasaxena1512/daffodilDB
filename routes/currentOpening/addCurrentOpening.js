var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var currentOpeningModule = require('../../modules/currentOpening');
var route = new Route('post', '/addCurrentOpening');

module.exports = route;
// public route
route.setPublic();

// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
        category : {
            type: 'string'
        },
        designation : {
            type: 'string'
        },
        rolesAndResponisibility : {
            type: 'string'
        },        
        experienceRequired : {
            type: 'string'
        },        
        noOfVaccancy : {
            type: 'string'
        },        
        closingDate : {
            type: 'string'
        },
        location: {
            type: 'string'
        }
    },
    required: ['designation', 'rolesAndResponisibility', 'location']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var category = req.body.category?req.body.category : "",
        designation = req.body.designation? req.body.designation : "",
        rolesAndResponisibility = req.body.rolesAndResponisibility? req.body.rolesAndResponisibility : "",
        experienceRequired = req.body.experienceRequired? req.body.experienceRequired : 0,
        noOfVaccancy = req.body.noOfVaccancy? req.body.noOfVaccancy : 0,
        closingDate = req.body.closingDate?  req.body.closingDate : new Date(),
        location = req.body.location? req.body.location : "";
        
    var currentOpeningModuleObject = {
        category,
        designation,
        rolesAndResponisibility,
        experienceRequired,
        noOfVaccancy,
        closingDate,
        location
    };

    return currentOpeningModuleModule.postCurrentOpeningModule(currentOpeningModuleObject)
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

