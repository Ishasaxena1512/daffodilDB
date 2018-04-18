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
	detail:{
		type: String,
		required : false
	},	
	focusArea:{
		type: String,
		required : false
	}
});

// model
module.exports = mongoose.model('socialWork', schema);
