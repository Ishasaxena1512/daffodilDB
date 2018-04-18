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
daffodilModule.postDaffodil = function(object) {
    return daffodilModel(object).save();
};

/**
 * Find daffodil
 * @Param {Object} query - query to Find
 */
daffodilModule.getAllDaffodil = function() {
    return daffodilModel.find({}).exec();
}
/**
 * Find daffodil
 * @Param {Object} query - query to Find
 */
daffodilModule.findDaffodil = function(query) {
    return daffodilModel.find(query).exec();
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

