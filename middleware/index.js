// All the middleware
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var flash = require("connect-flash");
var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function(req, res, next){
     // Is user Logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error","Campground not found");   // They can added anywhere before a redirect
                res.redirect("back");  // res.redirect("/campgrounds");
            }else{
                // does the user owns the campground. The author id of the campground matches the current user id ?
                // if(foundCampground.author.id === req.user._id) // This won't work... even though they look same 
                /* foundCampground.author.id is a mongoose object  ..........   req.user._id is a string . Hence the eqality won't work*/
                if(foundCampground.author.id.equals(req.user._id)){
                    // res.render("campgrounds/edit", {campground : foundCampground});    
                    next();  // Instead of showing the edit campground page, we are moving to next
                }else{
                    req.flash("error","You don't have permisssions to edit this campground");
                    res.redirect("back");  //res.send("You don't have permisssion to edit this home page")
                } 
            }
        });
        
    }else{
        req.flash("error","You need to be logged into to do that");
        res.redirect("back");  // Redirect to the previous page
        //res.send("You need to be logged in to edit the campground");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
     // Is user Logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");  // res.redirect("/campgrounds");
            }else{
                // does the user owns the comment. The author id of the comment matches the current user id ?
                // if(foundComment.author.id === req.user._id) // This won't work... even though they look same 
                /* foundComment.author.id is a mongoose object  ..........   req.user._id is a string . Hence the eqality won't work*/
                if(foundComment.author.id.equals(req.user._id)){
                    next();  
                }else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");  //res.send("You don't have permisssion to edit this home page")
                } 
            }
        });
        
    }else{
        req.flash("error","You need to be logged in");
        res.redirect("back");  // Redirect to the previous page
        //res.send("You need to be logged in to edit the campground");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");  //  This should be present before the redirection. Else won't work
    // Pass this object { message : req.flash("success") } to res redirect.        
    // This would be displayed in the next page 
    res.redirect("/login");
}


module.exports = middlewareObj;