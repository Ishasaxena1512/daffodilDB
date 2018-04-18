var CurOpeningModel = require('./model/currentOpeningModel');
var moment = require('moment');
/**
 * curOpening module
 */
var curOpeningModule = {};
module.exports = curOpeningModule;

/**
 * To create curOpening
 * @Param {Object} object - curOpening information
 */
curOpeningModule.addCurrOpening = function(object) {
    return CurOpeningModel(object).save();
};

/**
 * Find curOpening
 * @Param {Object} query - query to Find
 */
curOpeningModule.getAllCurrentOpening = function() {
    return CurOpeningModel.find({}).exec();
}
/**
 * Find curOpening
 * @Param {Object} query - query to Find
 */
curOpeningModule.findcurOpening = function(query) {
    return CurOpeningModel.find(query).exec();
}

/**
 * Delete curOpening
 * @Param {Object} query - query to Find
 */
curOpeningModule.deletecurOpening = function(query) {
    return CurOpeningModel.remove(query).exec();
}

/**
 * Update curOpening 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
curOpeningModule.findAndUpdate = function(query, updateQuery) {
    return CurOpeningModel.update(query, updateQuery).exec();
}

