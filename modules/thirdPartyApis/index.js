var thirdPartyApiModel = require('./model/thirdPartyApiModel');
var moment = require('moment');
/**
 * thirdPartyApi module
 */
var thirdPartyApiModule = {};
module.exports = thirdPartyApiModule;

/**
 * To create thirdPartyApi
 * @Param {Object} object - thirdPartyApi information
 */
thirdPartyApiModule.postThirdPartyApi = function(object) {
    return thirdPartyApiModel(object).save();
};

/**
 * Find thirdPartyApi
 * @Param {Object} query - query to Find
 */
thirdPartyApiModule.getAllThirdPartyApi = function() {
    return thirdPartyApiModel.find({}).exec();
}
/**
 * Find thirdPartyApi
 * @Param {Object} query - query to Find
 */
thirdPartyApiModule.findThirdPartyApi = function(query) {
    return thirdPartyApiModel.find(query).exec();
}

/**
 * Delete blog
 * @Param {Object} query - query to Find
 */
thirdPartyApiModule.deleteThirdPartyApi = function(query) {
    return thirdPartyApiModel.remove(query).exec();
}

/**
 * Update thirdPartyApi 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
thirdPartyApiModule.findAndUpdate = function(query, updateQuery) {
    return thirdPartyApiModel.update(query, updateQuery).exec();
}

