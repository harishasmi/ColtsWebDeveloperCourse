var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var methodOverride = require("method-override");

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


/* Requiring Routes*/  
var commentRoutes = require("./routes/comment"),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes = require("./routes/index");



/* Set the Public folder to server*/
app.use(express.static(__dirname + "/public"));

/* Set method override*/
app.use(methodOverride("_method"));

/*Models*/
var User = require("./models/user");
var Campground = require("./models/campground");
var Comment  = require("./models/comment");

app.use(bodyParser.urlencoded({ extended: true }));

/*View Engine*/
app.set("view engine","ejs");


/*Database Connections*/
mongoose.connect("mongodb://localhost/yelp-camp");

/*Seeding the DB file*/
//var SeedDb = require("./seeds");
//SeedDb();

// Passport configuration
app.use(require("express-session")({
    secret : "Something secret",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
// The methods are available in the passport-local-mongoose library
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Define your own middleware which would run for all the routes*/
/* In this case, the currentuser would be present for every route */
app.use(function(req, res , next){
   res.locals.currentUser = req.user;   // user = {username : xxxx,  _id : xxxx}
   next();
});

/* Tell express to use this routes*/

/* This would work without any params merge issues =>  where the routes use req.params.id */

// app.use(indexRoutes);
// app.use(campgroundRoutes);      //  router.get("/campgrounds",....
// app.use(commentRoutes);

/* Routes */
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);       // router.get("/"......
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
}); 
