var Route = require('../../lib/Route');
var errors = require('../../lib/errors');
var blogModule = require('../../modules/blogs');
var route = new Route('post', '/addBlog');

module.exports = route;
// public route
route.setPublic();

// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
        createdAt : {
            type: 'date'
        },
        createdBy : {
            type: 'string'
        },        
        title : {
            type: 'string'
        },        
        topic : {
            type: 'string'
        },        
        image : {
            type: 'array'
        },
        content: {
            type: 'string'
        }
    },
    required: ['createdBy', 'title', 'content']

});

// creating 
route.use(function(req, res, next) {
    console.log("req.body>>", req.body)
    var createdAt = req.body.createdAt?req.body.createdAt  : new Date(),
		createdBy = req.body.createdBy? req.body.createdBy : "",
		title = req.body.title? req.body.title : "",
		topic = req.body.topic? req.body.topic : "",
		image = req.body.image? req.body.image : [],
		content = req.body.content? req.body.content : "";
    var blogObject = {
        createdAt,
        createdBy,
        title,
        topic,
        image,
        content
    };

    return blogModule.postBlog(blogObject)
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

