var mongoose = require('mongoose'), 
Schema = require('mongoose').Schema;

var technology = require('../../technology/model/technologyModel'),
thirdPartyApi = require('../../thirdPartyApis/model/thirdPartyApiModel'),
industry = require('../../industry/model/industryModel'),
domain = require('../../domain/model/domainModel');


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
  		type: Schema.ObjectId,
        'ref': 'domain'  	
    },
  	industry:{
  		type: Schema.ObjectId,
        'ref': 'industry'  	
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
		type: Schema.ObjectId,
        'ref': 'technology' 
	}],
	backendTechnology:[{
		type: Schema.ObjectId,
        'ref': 'technology' 
	}],	
	allTechnologies:[{
		type: Schema.ObjectId,
        'ref': 'technology' 
	}],
	thirdPartyApis:[{
		type: Schema.ObjectId,
        'ref': 'thirdPartyApi' 
	}],
	deployedOn:{
		type: String,
		required : false
	}
});

// model
module.exports = mongoose.model('projects', schema); 
