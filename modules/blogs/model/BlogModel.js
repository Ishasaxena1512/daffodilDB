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
    title: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    topic: {
        type: String,
        required: false
    },
    image: [{
        type: String,
        required: false
    }],
    content: {
        type: String,
        required: true

    }

}, options);


// model
module.exports = mongoose.model('blogs', schema);
