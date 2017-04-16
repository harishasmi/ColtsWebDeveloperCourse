var mongoose = require("mongoose");

/* Create Schema, then a model which gives you all the methods */
var campgroundSchema = new mongoose.Schema({
    name : String,
    image : String,
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }],
    description : String,
    author : {
        id : { 
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    }
});

var Campground = mongoose.model("Campground",campgroundSchema);

module.exports = Campground;

/* module.exports = mongoose.model("Campground",campgroundSchema); */