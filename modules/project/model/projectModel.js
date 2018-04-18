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
  	description:{
  		type: String,
  		required : true
  	},
  	overview:{
  		type: String,
  		required : false
  	},
  	highlights:{
  		type: String,
  		required : false
  	},
  	domain:{
  		type: String,
  		required : false
  	},
  	usp:{
  		type: String,
  		required : false
  	},	
	platform:[{
		type: String,
		required : false
	}],
	clientInfo:{
		type: String,
		required : false
	},	
	images:[{
		type: String,
		required : false
	}],
	url:[{
		type: String,
		required : false
	}],
	teamSize:{ 
		type: Number,
		required: false
	},
	clientFeedback:[{
		type: String,
		required : false
	}],
	timespan:{
		type: String,
		required : false
	},	
	frontendTechnology:[{
		type: String,
		required : false
	}],
	backendTechnology:[{
		type: String,
		required : false
	}],
	thirdPartyApis:[{
		type: String,
		required : false
	}],
	deployedOn:{
		type: String,
		required : false
	}
});

// model
module.exports = mongoose.model('projects', schema); 
