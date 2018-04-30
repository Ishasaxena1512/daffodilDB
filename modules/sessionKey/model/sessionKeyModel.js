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

  context:{
      type: String,
      required : true,
      default : "defaultContext"
  },    
  contextArray:[{
  		type: String,
  		required : true
  }],	
	token:{
		type: String,
		required : true
	}
});
// model
module.exports = mongoose.model('session', schema); 
