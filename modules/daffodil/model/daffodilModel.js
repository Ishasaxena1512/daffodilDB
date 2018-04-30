var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var industry = require('../../industry/model/industryModel'),
hrPolicy = require('../../hRPolicy/model/HRPolicyModel'),
technology = require('../../technology/model/technologyModel'),
locations = require('../../location/model/locationModel'),
teamMember = require('../../teamMember/model/teamMemberModel'),
resources = require('../../resources/model/resourceModel'),
career = require('../../careers/model/careerModel'),
socialWork = require('../../socialWork/model/socialWorkModel'),
project = require('../../project/model/projectModel'),
domain = require('../../domain/model/domainModel'),
thirdPartyApi = require('../../thirdPartyApis/model/thirdPartyApiModel');
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
	name:{
  		type: String,
  		required : true
  	},	
  	aboutUs:{
  		type: String,
  		required : true
  	},
	employeeSize:{
		type: Number,
		required : false
	},	
	awards:[{
		type: String,
		required : false	
	}],		
	industry:[{
		type: Schema.ObjectId,
        'ref': 'industry',
		required : false	
	}],			
	hrPolicy:[{
		type: Schema.ObjectId,
        'ref': 'hrPolicy',
		required : false	
	}],			
	domain:[{
		type: Schema.ObjectId,
        'ref': 'domain',		
        required : false	
	}],			
	technology:[{
		type: Schema.ObjectId,
        'ref': 'technology',
		required : false	
	}],					
	locations:[{
		type: Schema.ObjectId,
        'ref': 'locations',
		required : false	
	}],			
	contact:[{
		type: String,
		required : false	
	}],			
	email:[{
		type: String,
		required : false	
	}],			
	clients:[{
		type: String,
		required : false	
	}],			
	blogs:[{
		type: String,
		required : false	
	}],			
	teamMember:[{
		type: Schema.ObjectId,
        'ref': 'teamMember',
		required : false	
	}],			
	resources:[{
		type: Schema.ObjectId,
        'ref': 'resources',
		required : false	
	}],		
	career:[{
		type: Schema.ObjectId,
        'ref': 'career',
		required : false	
	}],		
	socialWork:[{
		type: Schema.ObjectId,
        'ref': 'socialWork',
		required : false	
	}],	
	socialNetworkLinks:[{
		type: String,
		required : false	
	}],	
	projects:[{
		type: Schema.ObjectId,
        'ref': 'projects',
		required : false	
	}],	
	videosLink:[{
		type: String,
		required : false	
	}],	
	comm_tools:[{
		type: String,
		required : false	
	}],	
	code_mgmt_tools:[{
		type: String,
		required : false	
	}],	
	project_mgmt_tools:[{
		type: String,
		required : false	
	}],	
	business_model:[{
		type: String,
		required : false	
	}],	
	images:[{
		type: String,
		required : false	
	}],	
	thirdPartyApi:[{
		type: Schema.ObjectId,
        'ref': 'thirdPartyApi',
		required : false
	}]
});

// model
module.exports = mongoose.model('daffodil', schema);
