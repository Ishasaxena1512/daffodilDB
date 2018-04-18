var technologyModel = require('./model/technologyModel');
var moment = require('moment');
/**
 * technology module
 */
var technologyModule = {};
module.exports = technologyModule;

/**
 * To create technology
 * @Param {Object} object - technology information
 */
technologyModule.postTechnology = function(object) {
    return technologyModel(object).save();
};

/**
 * Find technology
 * @Param {Object} query - query to Find
 */
technologyModule.getAllTechnology = function() {
    return technologyModel.find({}).exec();
}
/**
 * Find technology
 * @Param {Object} query - query to Find
 */
technologyModule.findTechnology = function(query) {
    return technologyModel.find(query).exec();
}

/**
 * Delete technology
 * @Param {Object} query - query to Find
 */
technologyModule.deleteTechnology = function(query) {
    return technologyModel.remove(query).exec();
}

/**
 * Update technology 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
technologyModule.findAndUpdate = function(query, updateQuery) {
    return technologyModel.update(query, updateQuery).exec();
}

