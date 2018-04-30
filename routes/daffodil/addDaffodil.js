var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var daffodilModule = require('../../modules/daffodil');
var route = new Route('post', '/daffodil');

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
        images : [{
            type: 'string'
        }],                
        images : [{
            type: 'string'
        }],                
        images : [{
            type: 'string'
        }],                
        comm_tools : [{
            type: 'string'
        }],        
        code_mgmt_tools : [{
            type: 'string'
        }],        
        business_model : [{
            type: 'string'
        }],        
        project_mgmt_tools : [{
            type: 'string'
        }],        
        thirdPartyApi : [{
            type: 'string'
        }]
    },
    required: ['name', 'aboutUs']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var name = req.body.name?req.body.name : "",
        aboutUs = req.body.aboutUs? req.body.aboutUs : "",
        employeeSize = req.body.employeeSize? req.body.employeeSize : 0,
        awards = req.body.awards? req.body.awards : [],
        industry = req.body.industry? req.body.industry : [],
        hrPolicy = req.body.hrPolicy? req.body.hrPolicy : [],
        domain = req.body.domain? req.body.domain : [],
        technology = req.body.technology? req.body.technology : [],
        mobileTechnology = req.body.mobileTechnology? req.body.mobileTechnology : [],
        locations = req.body.locations? req.body.locations : [],
        contact = req.body.contact? req.body.contact : [],
        email = req.body.email? req.body.email : [],
        clients = req.body.clients? req.body.clients : [],
        blogs = req.body.blogs? req.body.blogs : [],
        teamMember = req.body.teamMember? req.body.teamMember : [],
        resources = req.body.resources? req.body.resources : [],
        career = req.body.career? req.body.career : [],
        socialWork = req.body.socialWork? req.body.socialWork : [],
        socialNetworkLinks = req.body.socialNetworkLinks? req.body.socialNetworkLinks : [],
        projects = req.body.projects? req.body.projects : [],
        videosLink = req.body.videosLink?  req.body.videosLink : [],
        comm_tools = req.body.comm_tools?  req.body.comm_tools : [],
        code_mgmt_tools = req.body.code_mgmt_tools?  req.body.code_mgmt_tools : [],
        project_mgmt_tools = req.body.project_mgmt_tools?  req.body.project_mgmt_tools : [],
        business_model = req.body.business_model?  req.body.business_model : [],
        images = req.body.images?  req.body.images : [],
        thirdPartyApi = req.body.thirdPartyApi? req.body.thirdPartyApi : [];
        
    var daffodilObject = {
        name,
        aboutUs,
        employeeSize,
        awards,
        industry,
        hrPolicy,
        domain,
        technology,
        locations,
        contact,
        email,
        clients,
        blogs,
        teamMember,
        resources,
        career,
        socialWork,
        socialNetworkLinks,
        projects,
        videosLink,
        comm_tools,
        code_mgmt_tools,
        project_mgmt_tools,
        business_model,
        images,
        thirdPartyApi
    };

    return daffodilModule.addData(daffodilObject)
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

