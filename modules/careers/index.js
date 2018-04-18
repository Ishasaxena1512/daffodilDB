var careerModel = require('./model/careerModel');
var moment = require('moment');
/**
 * career module
 */
var careerModule = {};
module.exports = careerModule;

/**
 * To create career
 * @Param {Object} object - career information
 */
careerModule.postCareer = function(object) {
    return careerModel(object).save();
};

/**
 * Find career
 * @Param {Object} query - query to Find
 */
careerModule.getAllCareer = function() {
    return careerModel.find({}).exec();
}
/**
 * Find career
 * @Param {Object} query - query to Find
 */
careerModule.findcareer = function(query) {
    return careerModel.find(query).exec();
}

/**
 * Delete career
 * @Param {Object} query - query to Find
 */
careerModule.deleteCareer = function(query) {
    return careerModel.remove(query).exec();
}


/**
 * Update career 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
careerModule.findAndUpdate = function(query, updateQuery) {
    return careerModel.update(query, updateQuery).exec();
}

