var sessionKeyModel = require('./model/sessionKeyModel');
var moment = require('moment');
/**
 * session module
 */
var sessionKeyModule = {};
module.exports = sessionKeyModule;

/**
 * To create session
 * @Param {Object} object - session information
 */
sessionKeyModule.postSession = function(object) {
    return sessionKeyModel(object).save();
};

/**
 * Find session
 * @Param {Object} query - query to Find
 */
sessionKeyModule.getAllSession = function() {
    return sessionKeyModel.find({}).exec();
}
/**
 * Find session
 * @Param {Object} query - query to Find
 */
sessionKeyModule.findSession = function(query) {
    return sessionKeyModel.find(query).exec();
}

/**
 * Delete session
 * @Param {Object} query - query to Find
 */
sessionKeyModule.deleteSession = function(query) {
    return sessionKeyModel.remove(query).exec();
}

/**
 * Update session 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
sessionKeyModule.findAndUpdate = function(query, updateQuery) {
    return sessionKeyModel.update(query, updateQuery).exec();
}

