var socialWorkModel = require('./model/socialWorkModel');
var moment = require('moment');
/**
 * socialWork module
 */
var socialWorkModule = {};
module.exports = socialWorkModule;

/**
 * To create socialWork
 * @Param {Object} object - socialWork information
 */
socialWorkModule.postSocialWork = function(object) {
    return socialWorkModel(object).save();
};

/**
 * Find socialWork
 * @Param {Object} query - query to Find
 */
socialWorkModule.getAllSocialWork = function() {
    return socialWorkModel.find({}).exec();
}
/**
 * Find socialWork
 * @Param {Object} query - query to Find
 */
socialWorkModule.findSocialWork = function(query) {
    return socialWorkModel.find(query).exec();
}

/**
 * Delete socialWork
 * @Param {Object} query - query to Find
 */
socialWorkModule.deleteSocialWork = function(query) {
    return socialWorkModel.remove(query).exec();
}

/**
 * Update socialWork 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
socialWorkModule.findAndUpdate = function(query, updateQuery) {
    return socialWorkModel.update(query, updateQuery).exec();
}

