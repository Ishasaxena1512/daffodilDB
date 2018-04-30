var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var daffodilModule = require('../../modules/daffodil');
var route = new Route('put', '/daffodil/:id');

module.exports = route;
// public route
route.setPublic();


// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
        name : {
            type: 'string'
        },
        aboutUs : {
            type: 'string'
        },
        employeeSize : {
            type: 'number'
        },  
        awards : [{
            type: 'string'
        }],
        industry : [{
            type: 'string'
        }],  
        hrPolicy : [{
            type: 'string'
        }],
        domain : [{
            type: 'string'
        }],  
        technology : [{
            type: 'string'
        }],
        locations : [{
            type: 'string'
        }],
        contact : [{
            type: 'string'
        }],  
        email : [{
            type: 'string'
        }],
        clients : [{
            type: 'string'
        }],  
        blogs : [{
            type: 'string'
        }],
        teamMember : [{
            type: 'string'
        }],  
        resources : [{
            type: 'string'
        }],  
        career : [{
            type: 'string'
        }],
        socialWork : [{
            type: 'string'
        }],  
        socialNetworkLinks : [{
            type: 'string'
        }],
        projects : [{
            type: 'string'
        }],  
        videosLink : [{
            type: 'string'
        }],
        comm_tools : [{
            type: 'string'
        }],        
        code_mgmt_tools : [{
            type: 'string'
        }],  
        project_mgmt_tools : [{
            type: 'string'
        }],       
        business_model : [{
            type: 'string'
        }], 
        images : [{
            type: 'string'
        }],        
        thirdPartyApi : [{
            type: 'string'
        }]
    }
});

// find if already exist 
route.use(function(req, res, next) {
    return daffodilModule.findDaffodil({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"daffodil does not exist" }); 
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

    return daffodilModule.findAndUpdate({ _id : req.params.id}, updateObj)
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

