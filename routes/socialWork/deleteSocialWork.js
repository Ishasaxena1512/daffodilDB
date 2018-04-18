var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var sociaWorkModule = require('../../modules/socialWork');
var route = new Route('delete', '/deleteSocialWork/:id');

module.exports = route;

// public route
route.setPublic();

// validate input 
route.validateInputParams({
    type: 'object',
    properties: {
        id: { type: 'string' }
    }, required: ['id']
});

// find if already exist 
route.use(function(req, res, next) {
    return sociaWorkModule.findSocialWork({ _id : req.params.id})
        .then(function(result) {
            if (result && result.length) {
                return next();
            } else {
                return res.json({ success : false, error :"blog does not exist" }); 
            }
        })
        .catch(next);
});

// find if already exist 
route.use(function(req, res, next) {
    return sociaWorkModule.deleteSocialWork({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedBlogId :req.params.id }); 
        })
        .catch(next);
});




