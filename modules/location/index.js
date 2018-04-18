var locationModel = require('./model/locationModel');
var moment = require('moment');
/**
 * location module
 */
var locationModule = {};
module.exports = locationModule;

/**
 * To create location
 * @Param {Object} object - location information
 */
locationModule.postlocation = function(object) {
    return locationModel(object).save();
};

/**
 * Find location
 * @Param {Object} query - query to Find
 */
locationModule.getAllLocation = function() {
    return locationModel.find({}).exec();
}
/**
 * Find location
 * @Param {Object} query - query to Find
 */
locationModule.findLocation = function(query) {
    return locationModel.find(query).exec();
}

/**
 * Delete location
 * @Param {Object} query - query to Find
 */
locationModule.deleteLocation = function(query) {
    return locationModel.remove(query).exec();
}

/**
 * Update location 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
locationModule.findAndUpdate = function(query, updateQuery) {
    return locationModel.update(query, updateQuery).exec();
}

