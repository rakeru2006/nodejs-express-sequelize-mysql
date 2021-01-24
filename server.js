// Requiring necessary npm packages
//The first line assigns the express module to a variable express. We then initialize express  
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
//Then the app listen on port 8000. We can use any free port number on our computer. 
// set port, listen for requests
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
// we create a new variable to save the information in app. 

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
// For Passport
//to ensure that the login session is restored in the correct order.
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
//middleware is required to initialize Passport. If your application uses persistent login sessions,
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
app.listen(PORT, function() {
console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
});
