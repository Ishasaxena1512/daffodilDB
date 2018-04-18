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

  	name:{
  		type: String,
  		required : true
  	},
	designation:{
		type: String,
		required : false
	},	
	detailInfo:{
		type: String,
		required : false
	},
	images:[{
		type: String,
		required : false	
	}],
	socialLinks:[{
		type: String,
		required : false
	}]
});

// model
module.exports = mongoose.model('leadershipTeam', schema);
