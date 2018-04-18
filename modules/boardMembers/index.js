var BoardMemberModel = require('./model/boardMemberModel');
var moment = require('moment');
/**
 * boardMember module
 */
var boardMemberModule = {};
module.exports = boardMemberModule;

/**
 * To create boardMember
 * @Param {Object} object - boardMember information
 */
boardMemberModule.postboardMember = function(object) {
    return BoardMemberModel(object).save();
};

/**
 * Find boardMember
 * @Param {Object} query - query to Find
 */
boardMemberModule.getAllBoardMembers = function() {
    return BoardMemberModel.find({}).exec();
}
/**
 * Find boardMember
 * @Param {Object} query - query to Find
 */
boardMemberModule.findboardMember = function(query) {
    return BoardMemberModel.find(query).exec();
}

/**
 * Delete boardMember
 * @Param {Object} query - query to Find
 */
boardMemberModule.deleteBoardMember = function(query) {
    return BoardMemberModel.remove(query).exec();
}

/**
 * Update boardMember 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
boardMemberModule.findAndUpdate = function(query, updateQuery) {
    return BoardMemberModel.update(query, updateQuery).exec();
}

