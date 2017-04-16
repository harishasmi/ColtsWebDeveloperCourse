var express = require("express");
var router = express.Router();
var User = require("../models/user")
var passport = require("passport");

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
            console.log(err);
            return res.render("register");  // Shortcircut everything
        }
        passport.authenticate("local")(req, res, function(){
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
   res.redirect("/campgrounds");
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;