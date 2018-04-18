var projectModel = require('./model/projectModel');
var moment = require('moment');
/**
 * project module
 */
var projectModule = {};
module.exports = projectModule;

/**
 * To create project
 * @Param {Object} object - project information
 */
projectModule.addProject = function(object) {
    return projectModel(object).save();
};

/**
 * Find project
 * @Param {Object} query - query to Find
 */
projectModule.getAllProject = function() {
    return projectModel.find({}).exec();
}
/**
 * Find project
 * @Param {Object} query - query to Find
 */
projectModule.findProject = function(query) {
    return projectModel.find(query).exec();
}

/**
 * Delete project
 * @Param {Object} query - query to Find
 */
projectModule.deleteProject = function(query) {
    return projectModel.remove(query).exec();
}

/**
 * Update project 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
projectModule.findAndUpdate = function(query, updateQuery) {
    return projectModel.update(query, updateQuery).exec();
}

