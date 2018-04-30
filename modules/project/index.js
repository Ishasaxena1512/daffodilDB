var projectModel = require('./model/projectModel');
// var Domain = require('../domain/model/domainModel');
// var Industry = require('../industry/model/industryModel');
// var Technology = require('../technology/model/technologyModel');
// var ThirdPartyApis = require('../thirdPartyApis/model/thirdPartyApiModel');
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
    return projectModel.find({}).populate('domain', 'title').populate('industry', 'title').populate('frontendTechnology', 'title').populate('backendTechnology', 'title').populate('thirdPartyApis', 'name').exec();
}
/**
 * Find project
 * @Param {Object} query - query to Find
 */
projectModule.findProject = function(query) {
    return projectModel.find(query).populate('domain', 'title').populate('industry', 'title').populate('frontendTechnology', 'title').populate('backendTechnology', 'title').populate('thirdPartyApis', 'name').exec();
}

/**
 * Find aggregate project
 * @Param {Object} query - query to Find
 */
projectModule.findProjectAggregate = function(query) {
	// console.log("query::::::::::::::::::::::::::::", query)
    return projectModel.aggregate(query);
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

