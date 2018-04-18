var domainModel = require('./model/domainModel');
var moment = require('moment');
/**
 * domain module
 */
var domainModule = {};
module.exports = domainModule;

/**
 * To create domain
 * @Param {Object} object - domain information
 */
domainModule.postDomain = function(object) {
    return domainModel(object).save();
};

/**
 * Find domain
 * @Param {Object} query - query to Find
 */
domainModule.getAllDomain = function() {
    return domainModel.find({}).exec();
}
/**
 * Find domain
 * @Param {Object} query - query to Find
 */
domainModule.findDomain = function(query) {
    return domainModel.find(query).exec();
}

/**
 * Delete domain
 * @Param {Object} query - query to Find
 */
domainModule.deleteDomain = function(query) {
    return domainModel.remove(query).exec();
}

/**
 * Update domain 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
domainModule.findAndUpdate = function(query, updateQuery) {
    return domainModel.update(query, updateQuery).exec();
}

