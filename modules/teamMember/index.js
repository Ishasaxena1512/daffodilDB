var TeamMemberModel = require('./model/teamMemberModel');
var moment = require('moment');
/**
 * teamMember module
 */
var teamMemberModule = {};
module.exports = teamMemberModule;

/**
 * To create teamMember
 * @Param {Object} object - teamMember information
 */
teamMemberModule.postTeamMember = function(object) {
    return TeamMemberModel(object).save();
};

/**
 * Find teamMember
 * @Param {Object} query - query to Find
 */
teamMemberModule.getAllTeamMembers = function() {
    return TeamMemberModel.find({}).exec();
}
/**
 * Find teamMember
 * @Param {Object} query - query to Find
 */
teamMemberModule.findTeamMember = function(query) {
    return TeamMemberModel.find(query).exec();
}

/**
 * Delete teamMember
 * @Param {Object} query - query to Find
 */
teamMemberModule.deleteTeamMember = function(query) {
    return TeamMemberModel.remove(query).exec();
}

/**
 * Update teamMember 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
teamMemberModule.findAndUpdate = function(query, updateQuery) {
    return TeamMemberModel.update(query, updateQuery).exec();
}

