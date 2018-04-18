var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var daffodilModule = require('../../modules/daffodil');
var route = new Route('delete', '/deleteDaffodil/:id');

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

// find if already exist 
route.use(function(req, res, next) {
    return daffodilModule.deleteDaffodil({ _id : req.params.id})
        .then(function(result) {
            return res.json({ success : true, deletedDaffodilId :req.params.id }); 
        })
        .catch(next);
});
