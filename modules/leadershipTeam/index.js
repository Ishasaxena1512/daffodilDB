var leadershipModel = require('./model/leadershipModel');
var moment = require('moment');
/**
 * leadership team module
 */
var leadershipModule = {};
module.exports = leadershipModule;

/**
 * To create leadership team
 * @Param {Object} object - leadership member information
 */
leadershipModule.postLeadership = function(object) {
    return leadershipModel(object).save();
};

/**
 * Find leadership
 * @Param {Object} query - query to Find
 */
leadershipModule.getAllLeadershipModel = function() {
    return leadershipModel.find({}).exec();
}
/**
 * Find leadership
 * @Param {Object} query - query to Find
 */
leadershipModule.findLeadership = function(query) {
    return leadershipModel.find(query).exec();
}

/**
 * Delete leadership
 * @Param {Object} query - query to Find
 */
leadershipModule.deleteLeadership = function(query) {
    return leadershipModel.remove(query).exec();
}

/**
 * Update leadership 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
leadershipModule.findAndUpdate = function(query, updateQuery) {
    return leadershipModel.update(query, updateQuery).exec();
}

