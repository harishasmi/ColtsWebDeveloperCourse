var express = require("express");
var router = express.Router({mergeParams : true});      // Merge the params from Campround and Comment route together
                                                        // So that the campground params are available in this comment route
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

/* Comments Route */

router.get("/new",middleware.isLoggedIn, function(req, res) {
    // console.log(req.params.id);  This shows as null. Campground id is not going in through the comment route.
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){console.log(err);}
       else{
            res.render("comments/new", {campground : foundCampground});    
       }
    });
});

// Someone can theoritically send a post request even if he is not authenticated
router.post("/",middleware.isLoggedIn, function(req, res){
    //Find the Campground by Id
    Campground.findById(req.params.id, function(err, foundCampground) {
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }
       else{
           //console.log(req.body.comment);  
           // Create a comment from the body and push it into the Campgrounds comments array
           Comment.create(req.body.comment, function(err, newComment){
               if(err) { console.log(err) }
               else{
                   // Add username and id to comment Save comment to the Campground
                   // We get the user and id details from the req object since it is using the isLoggedIn middleware
                   // console.log("The current user is "+ req.user) ;  ==> Gives req.user._id and req.user.username
                   
                   newComment.author.id = req.user._id;
                   newComment.author.username = req.user.username;
                   //console.log(newComment);
                   // We needed to save the comment ... Damm it
                   newComment.save();
                   foundCampground.comments.push(newComment);
                   foundCampground.save();
                   res.redirect("/campgrounds/" + foundCampground._id);
               }
           })
           
       }
    });
});

//  /campgrounds/:id/comments/:comment_id/edit          ::::> you cannot have two route paramas with the same name. Hope you understand

// Edit Route                                    There is no need for isLoggedIn middleware because the checkCommentOwnership already performs the activity
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){  
   /*res.send(" this is the edit route for comment"); */
   /* req.params.id exists from the parent route ( eh? )*/
   Comment.findById(req.params.comment_id, function(err, foundComment) {
      if(err){ res.redirect("back"); }
      else{
         res.render("comments/edit", {campground_id : req.params.id, comment : foundComment});        
      }
    });
  
});


// Update Route
router.put("/:comment_id", middleware.checkCommentOwnership,  function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("/campgrounds/"+  req.params.id);   // Getting it from the parent route
       }
    });
});


// Delete Route

router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
   /*res.send("Comment Delete route");*/
   
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("back");  // Now this can also be done
           // res.redirect(("/campgrounds" + req.params.id));
       }
   })
   
});


module.exports = router;
