var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

// transform for sending as json
function omitPrivate(doc, obj) {
    delete obj.__v;
    delete obj.id;
    return obj;
}

// options
var options = {
    toJSON: { virtuals: true, transform: omitPrivate },
    toObject: { virtuals: true, transform: omitPrivate },
    timestamps: true
};

// schema
var schema = new Schema({
	category:{
		type: String,
		required : false
	},		
	designation:{
		type: String,
		required : false
	},		
	rolesAndResponisibility:[{
		type: String,
		required : false
	}],			
	experienceRequired:{
		type: String,
		required : false
	},	
	noOfVaccancy:{
		type: Number,
		required : false
	},	
	closingDate:{
		type: Date,
		required : false
	},
	location : {
		type: String,
		required : false 
	}
}, options);
// model
module.exports = mongoose.model('currentOpening', schema);
