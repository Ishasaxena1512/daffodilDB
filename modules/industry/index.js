var industryModel = require('./model/industryModel');
var moment = require('moment');
/**
 * industry module
 */
var industryModule = {};
module.exports = industryModule;

/**
 * To create industry
 * @Param {Object} object - industry information
 */
industryModule.postIndustry = function(object) {
    return industryModel(object).save();
};

/**
 * Find industry
 * @Param {Object} query - query to Find
 */
industryModule.getAllIndustry = function() {
    return industryModel.find({}).exec();
}
/**
 * Find industry
 * @Param {Object} query - query to Find
 */
industryModule.findIndustry = function(query) {
    return industryModel.find(query).exec();
}

/**
 * Delete industry
 * @Param {Object} query - query to Find
 */
industryModule.deleteIndustry = function(query) {
    return industryModel.remove(query).exec();
}

/**
 * Update industry 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
industryModule.findAndUpdate = function(query, updateQuery) {
    return industryModel.update(query, updateQuery).exec();
}

