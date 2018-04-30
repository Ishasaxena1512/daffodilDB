var daffodilModel = require('./model/daffodilModel');
var moment = require('moment');
/**
 * daffodil module
 */
var daffodilModule = {};
module.exports = daffodilModule;

/**
 * To create daffodil
 * @Param {Object} object - daffodil information
 */
daffodilModule.addData = function(object) {
    return daffodilModel(object).save();
};

/**
 * Find daffodil
 * @Param {Object} query - query to Find
 */
daffodilModule.getAllInfo = function() {
    return daffodilModel.find({}).populate('domain', 'title').exec();
}
/**
 * Find daffodil
 * @Param {Object} query - query to Find
 */
daffodilModule.findDaffodil = function(query) {
    return daffodilModel.find(query).populate('industry', 'title').populate('hrPolicy', 'title').populate('technology', 'title').populate('locations', 'title contact').populate('teamMember', 'name').populate('resources', 'name').populate('career').populate('socialWork', 'title').populate('projects', 'title').populate('domain', 'title').populate('thirdPartyApi','name').exec();
}

/**
 * Delete daffodil
 * @Param {Object} query - query to Find
 */
daffodilModule.deleteDaffodil = function(query) {
    return daffodilModel.remove(query).exec();
}


/**
 * Update daffodil 
 * @Param {Object} query - query to Find
 * @Param {Object} updateQuery - query to update data
 */
daffodilModule.findAndUpdate = function(query, updateQuery) {
    return daffodilModel.update(query, updateQuery).exec();
}

