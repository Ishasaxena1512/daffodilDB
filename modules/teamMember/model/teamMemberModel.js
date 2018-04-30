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

var schema = new Schema({
	name:{
		type: String,
		required : true
	},		
	designation:{
		type: String,
		required : false
	},			
	isBoardMember:{
		type: Boolean,
		required : true,
		default : false
	},		
	detailInfo:{
		type: String,
		required : false
	},			
	image:[{
		type: String,
		required : false
	}],
	socialLinks : [{
		type: String,
		required : false 
	}]
	}, options);


// model
module.exports = mongoose.model('teamMember', schema);
