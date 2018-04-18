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
	industries:[{
		type: String,
		required : false	
	}],			
	hrPolicy:[{
		type: String,
		required : false	
	}],			
	domain:[{
		type: String,
		required : false	
	}],			
	webTechnology:[{
		type: String,
		required : false	
	}],			
	mobileTechnology:[{
		type: String,
		required : false	
	}],			
	location:[{
		type: String,
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
	boardMembers:[{
		type: String,
		required : false	
	}],		
	leadershipTeam:[{
		type: String,
		required : false	
	}],		
	resources:[{
		type: String,
		required : false	
	}],		
	careers:[{
		type: String,
		required : false	
	}],		
	socialWork:[{
		type: String,
		required : false	
	}],	
	socialNetworkLinks:[{
		type: String,
		required : false	
	}],	
	projects:[{
		type: String,
		required : false	
	}],	
	videosLink:[{
		type: String,
		required : false	
	}],	
	images:[{
		type: String,
		required : false	
	}],	
	thirdPartyApis:[{
		type: String,
		required : false
	}]
});

// model
module.exports = mongoose.model('daffodil', schema);
