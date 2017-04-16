var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");
// var middleware = require("../middleware/index");  // Inddex.js is the sort of default file
var middleware = require("../middleware");


/* Campgrounds Route */
// Show All Campgrounds Route   -- Index
router.get("/",function(req, res){
    // console.log(req.user);  // Contains the username and id of the user as an object. Use this in the header template.
    Campground.find({},function(err,campgrounds){
       if(err){console.log(err);}
       else{
           // res.render("campgrounds/index", {campgrounds : campgrounds, currentUser : req.user});
           res.render("campgrounds/index", {campgrounds : campgrounds});
       }
    });
}); 

// New Route

router.get("/new",middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new") ;
});

// Create Route

router.post("/",middleware.isLoggedIn, function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id : req.user._id,
       username : req.user.username
   }
   var newCampground = { name : name, image : image, description : description, author : author};
   Campground.create(newCampground,function(err, newlyCreatedCampground){
      if(err){console.log(err);}
      else{
        res.redirect("/campgrounds");       
      }
   });
    /*campgrounds.push(newCampground); */   
});


// Show a Sigle Campgroound Route    --Show Route

router.get("/:id",function(req, res) {
    /* Populate the Comments for this Campground */
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    /* Campground.findById(req.params.id, function(err, foundCampground){ */
       if(err){ console.log(err); }
       else{
           res.render("campgrounds/show", {campground : foundCampground});
       }
    });
});


// Edit Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground) {
       if(err){console.log(err);}
       else{
        res.render("campgrounds/edit", {campground : foundCampground});
       }
   })
    
});

// Update Route

router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){ 
            res.redirect('/campgrounds');
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
   }); 
});


// Destroy Campground Route

router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    })
});


 

module.exports = router; 