var clientFeedbackModel = require('./model/clientFeedbackModel');
var moment = require('moment');
/**
 * clientFeedback module
 */
var clientFeedbackModule = {};
module.exports = clientFeedbackModule;

/**
 * To create clientFeedback
 * @Param {Object} object - clientFeedback information
 */
clientFeedbackModule.postClientFeedback = function(object) {
    return clientFeedbackModel(object).save();
};

/**
 * Find clientFeedback
 * @Param {Object} query - query to Find
 */
clientFeedbackModule.getAllClientFeedback = function() {
    return clientFeedbackModel.find({}).exec();
}
/**
 * Find clientFeedback
 * @Param {Object} query - query to Find
 */
clientFeedbackModule.findClientFeedback = function(query) {
    return clientFeedbackModel.find(query).exec();
}

/**
 * Delete clientFeedback
 * @Param {Object} query - query to Find
 */
clientFeedbackModule.deleteClientFeedback = function(query) {
    return clientFeedbackModel.remove(query).exec();
}

/**
 * Update clientFeedback 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
clientFeedbackModule.findAndUpdate = function(query, updateQuery) {
    return clientFeedbackModel.update(query, updateQuery).exec();
}

