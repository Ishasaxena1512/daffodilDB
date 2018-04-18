var clientInfoModel = require('./model/clientInfoModel');
var moment = require('moment');
/**
 * clientInfo module
 */
var clientInfoModule = {};
module.exports = clientInfoModule;

/**
 * To create clientInfo
 * @Param {Object} object - clientInfo information
 */
clientInfoModule.postClientInfo = function(object) {
    return clientInfoModel(object).save();
};

/**
 * Find clientInfo
 * @Param {Object} query - query to Find
 */
clientInfoModule.getAllClientInfo = function() {
    return clientInfoModel.find({}).exec();
}
/**
 * Find clientInfo
 * @Param {Object} query - query to Find
 */
clientInfoModule.findClientInfo = function(query) {
    return clientInfoModel.find(query).exec();
}

/**
 * Delete clientInfo
 * @Param {Object} query - query to Find
 */
clientInfoModule.deleteClientInfo = function(query) {
    return clientInfoModel.remove(query).exec();
}


/**
 * Update clientInfo 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
clientInfoModule.findAndUpdate = function(query, updateQuery) {
    return clientInfoModel.update(query, updateQuery).exec();
}

