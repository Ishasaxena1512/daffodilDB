var resourceModel = require('./model/resourceModel');
var moment = require('moment');
/**
 * resource module
 */
var resourceModule = {};
module.exports = resourceModule;

/**
 * To create resource
 * @Param {Object} object - resource information
 */
resourceModule.postResource = function(object) {
    return resourceModel(object).save();
};

/**
 * Find resource
 * @Param {Object} query - query to Find
 */
resourceModule.getAllResource = function() {
    return resourceModel.find({}).exec();
}
/**
 * Find resource
 * @Param {Object} query - query to Find
 */
resourceModule.findResource = function(query) {
    return resourceModel.find(query).exec();
}

/**
 * Delete resource
 * @Param {Object} query - query to Find
 */
resourceModule.deleteResource = function(query) {
    return resourceModel.remove(query).exec();
}

/**
 * Update resource 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
resourceModule.findAndUpdate = function(query, updateQuery) {
    return resourceModel.update(query, updateQuery).exec();
}

