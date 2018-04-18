var BlogModel = require('./model/BlogModel');
var moment = require('moment');
/**
 * blog module
 */
var blogModule = {};
module.exports = blogModule;

/**
 * To create blog
 * @Param {Object} object - blog information
 */
blogModule.postBlog = function(object) {
    return BlogModel(object).save();
};

/**
 * Find blog
 * @Param {Object} query - query to Find
 */
blogModule.getAllBlogs = function() {
    return BlogModel.find({}).exec();
}
/**
 * Find blog
 * @Param {Object} query - query to Find
 */
blogModule.findBlog = function(query) {
    return BlogModel.find(query).exec();
}

/**
 * Delete blog
 * @Param {Object} query - query to Find
 */
blogModule.deleteBlog = function(query) {
    return BlogModel.remove(query).exec();
}


/**
 * Update blog 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
blogModule.findAndUpdate = function(query, updateQuery) {
    return BlogModel.update(query, updateQuery).exec();
}

