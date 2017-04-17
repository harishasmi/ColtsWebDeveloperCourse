var express = require("express");
var router = express.Router();
var User = require("../models/user")
var passport = require("passport");
var flash = require("connect-flash");

/*Routes*/
router.get("/",function(req,res){
   res.render("landing"); 
});


// ***************
/* Auth Routes */
// ***************

// Show register routes  (Or the SignUp routes)

router.get("/register", function(req, res) {
   res.render("register"); 
});

router.post("/register", function(req, res) {
    var newUser = new User({ username : req.body.username});
    // This method won't allow you to register an already registered user
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            // console.log(err);      // 'err' is an object that is getting from database.
            // Always have the flash message just before redirect.
            // And console log apparently clears the flash. Who would have thought about that.
            // Refer http://stackoverflow.com/questions/41558884/node-connect-flash-not-working-on-redirect  Not helping
            
            // Apparently res.render("register") didn't work with flash. But res.redirect("/register") worked. Yay !!
            req.flash("error", err.message);   // Error occurs when the user is taken, password is empty etc.
            return res.redirect("/register");  // Shortcircut everything. Else the below code would run as well and that would throw an error
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelp Camp " + user.username); // 'user' is coming from database
            res.redirect("/campgrounds");
        })
    });
});


// Login Routes
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect : "/campgrounds",
        failureRedirect : "/login"
    }), function(req, res) {
    
});

// Logout Routes
router.get("/logout", function(req, res) {
   req.logout(); 
   req.flash("success","Logged you out");
   res.redirect("/campgrounds");
});


module.exports = router;