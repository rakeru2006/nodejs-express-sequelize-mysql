# nodejs-express-sequelize-mysql

# :sparkles: Project Title  Create Node  application   :sparkles:
================

## Author :bowtie:
***

Created by Raquel Ceron


  ## Prerequisites
  :feet:
  ***
  Node.js
  JavaScript 
  Express 
  NPM
  MySQL
  Sequelize 
  Postman

  Make sure you have [Node.js](http://nodejs.org/) 
  

  ```
   npm install
   node -v
   npm -v

  ```
The first thing we are going to do is build a package.json


  ```
   npm init

  ```

This is an example how look our paket json
```
{
  "name": "nodejs-express-sequelize-mysql",
  "version": "1.0.0",
  "description": "Node.js Rest Apis with Express, Sequelize & MySQL.",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/rakeru2006/nodejs-express-sequelize-mysql.git"
  },
  "keywords": [
    "nodejs",
    "express",
    "rest",
    "api",
    "sequelize",
    "mysql"
  ],
  "author": "rake",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/rakeru2006/nodejs-express-sequelize-mysql/issues"
  },
  "homepage": "https://github.com/rakeru2006/nodejs-express-sequelize-mysql#readme",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "mysql2": "^2.2.5",
    "passport": "^0.4.1",
    "passport-local": "^1.0.0",
    "sequelize": "^6.4.0"
  }
}
```
We need  install dependencies



```
npm install express sequelize mysql2
"bcryptjs": "^2.4.3",
"cors": "^2.8.5",
"express": "^4.17.1",
"express-session": "^1.17.1",
"mysql2": "^2.2.5",
"passport": "^0.4.1",
"passport-local": "^1.0.0",
"sequelize": "^6.4.0"
```

In your project Add a file named .gitignore

```
node_modules
```

node_modules

Now it is time to create our server.js file in the root folder. In this file, we are going to create our Express application.


```
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

```

Instaling nodemon npm


```
npm i -D nodemon
```

We are going to make use of the Sequelize CLI package to start the project for us.
Let's start by installing the Sequelize CLI package.

```
npm install -g sequelize-cli

```
Installing Sequelize and mysql2


```
 npm i --save sequelize mysql2
```
We initialize Sequelize
```
sequelize init
```
If you inspect your directory at this point, you will notice that this create tow directories,
 create a new folder named models and create a new file named index.js in the models folder and
 create a new folder named config and create a new file named config.json in the models folder.

 Your directory structure should now look like this:

 nodejs-express-sequelize-mysql/
 ├── config/
 │   └── config.json
 ├── migrations/
 ├── models/
 │   └── index.js
 ├── node_modules/
 ├── seeders/
 ├── server.js
 ├── package-lock.json
 └── package.json

Do not modify anything from the server / models / index.js file that was generated automatically

Adding config and passport files

Inside /config, create a file called passport.js and place the following code in it:

```
ar passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;

```

Inside /models, create a file called user.js and place the following code in it:
In this file, we use the method validatePassword that we defined in the User model

```
// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
```



Let’s connect “passport.js” to our “server.js” file. Add the following line below all models:

```
require('./config/passport');
```

Database Configuration

Create MySQL Database

We create a db folder and the schema.sql file with the data from the "passport_demo" database


```
DROP DATABASE IF EXISTS passport_demo;
CREATE DATABASE passport_demo;
```
It is important to create the database that will be used on your server or computer.
we run the las commands in MySQL Workbench to CREATE DATABASE passport_demo;


Naw we are going to configure and connect to MySQL database in the following config.json file found in config / config.json
Be shure to  modify your   "password": and  "database": to match with your congiguration in MySQL Workbench

```
{
  "development": {
    "username": "root",
    "password": "password123",
    "database": "passport_demo",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "password123",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "password123",
    "database": "passport_demo",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
Generating Models to create table

Now again we will use the sequelize cli command to generate model files and migrations.
We will have three models: User


```
sequelize model:create --name usuario --attributes username:string,status:char
```
Define Routes

Now run:

```
node server.js
```
You should see the table create in worbench . This means that our Sequelize models have been synced successfully, and if you check your database you should see a users table with the columns specified present.


Define Routes



```
```
```

Test Aplication 

![demo](https://github.com/rakeru2006/nodejs-express-sequelize-mysql/blob/main/test1.png)
![demo](https://github.com/rakeru2006/nodejs-express-sequelize-mysql/blob/main/test3.png)
![demo](https://github.com/rakeru2006/nodejs-express-sequelize-mysql/blob/main/test3.png)

