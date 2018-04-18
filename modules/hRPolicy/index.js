var HRPolicyModel = require('./model/HRPolicyModel');
var moment = require('moment');
/**
 * hrPolicy module
 */
var HRPolicyModule = {};
module.exports = HRPolicyModule;

/**
 * To create hrPolicy
 * @Param {Object} object - hrPolicy information
 */
HRPolicyModule.postHRPolicy = function(object) {
    return HRPolicyModel(object).save();
};

/**
 * Find hrPolicy
 * @Param {Object} query - query to Find
 */
HRPolicyModule.getAllHRPolicy = function() {
    return HRPolicyModel.find({}).exec();
}
/**
 * Find hrPolicy
 * @Param {Object} query - query to Find
 */
HRPolicyModule.findHRPolicy = function(query) {
    return HRPolicyModel.find(query).exec();
}

/**
 * Delete HR Policy
 * @Param {Object} query - query to Find
 */
HRPolicyModule.deleteHRPolicy = function(query) {
    return HRPolicyModel.remove(query).exec();
}


/**
 * Update hrPolicy 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
HRPolicyModule.findAndUpdate = function(query, updateQuery) {
    return HRPolicyModel.update(query, updateQuery).exec();
}

