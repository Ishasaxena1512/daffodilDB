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
  	title:{
  		type: String,
  		required : true
  	},
	type:{
		type: String,
		required : false  	
	},
	version:{
		type: String,
		required : false  	
	},
	description:{
		type: String,
		required : false
	},	
	overview:{
		type: String,
		required : false
	},
	glimpseOfProjects:[{
		type: String,
		required : false	
	}],	
	recommenedReading:[{
		type: String,
		required : false	
	}]
});


// model
module.exports = mongoose.model('technology', schema);
