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

  	type:{
  		type: String,
  		required : true
  	},	
	name:{
		type: String,
		required : false
	},
	downloadLink:[{
		type: String,
		required : false
	}]
});
// model
module.exports = mongoose.model('resources', schema); 
