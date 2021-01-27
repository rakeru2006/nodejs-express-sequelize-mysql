# nodejs-express-sequelize-mysql

# :sparkles: Project Title  Create Node  application   :sparkles:
================

## Author :bowtie:
***

Created by Raquel Ceron

What is Sequelize?

Sequelize is a promise-based ORM for Node.js. It supports PostgreSQL, MySQL, SQLite, and MSSQL, and delivers robust transaction features, table relationships, data loading and migration mechanisms, and more.



ORM

Object - Refers to the object (s) that we can use in our language.

Relational - Refers to our Database Management System (MySQL, MSSQL, PostgreSQL).

Mapping - Refers to the connection between the objects and the tables.



## Prerequisites
  :feet:
  ***

   ```
  MySQL Workbench
  Node.js
  JavaScript
  Express
  NPM
  MySQL2
  Sequelize
  Postman
 ```
## References
 :feet:
 ***


 [sequelize](https://sequelize.org/v3/)
 
 [passpor](http://www.passportjs.org/)
 

  Make sure you install [Node.js](http://nodejs.org/)


  ```
   npm install
   node -v
   npm -v

  ```



## Step1: Generate a package.json file
  :feet:
  ***
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

## Step 2: Install Dependencies
  :feet:
  ***

We need  install dependencies



```
npm install express sequelize mysql2  bcryptjs cors  express-session   passport  passport-local
```

In your project Add a file named .gitignore

```
node_modules
```

node_modules


## Step 3: Configure the application
  :feet:
  ***
Now, we create a server file. This will be the main file called when you type the following:

npm start
This runs the application. You can also run the application by typing node server.js.
```
node server.js
```
Now it is time to edit our server.js file in the root folder. In this file, we are going to create our Express application.


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
## Step 4: Configure Sequelize with MySQL
  :feet:
  ***


## Step 4.1: Create MySQL Database
  :feet:
  ***

We create a db folder and the schema.sql file with the data from the "passport_demo" database


```
DROP DATABASE IF EXISTS passport_demo;
CREATE DATABASE passport_demo;
```
It is important to create the database that will be used on your server or computer.
we run the las commands in MySQL Workbench to CREATE DATABASE passport_demo;


We are going to make use of the Sequelize CLI package to start the project for us.
Let's start by installing the Sequelize CLI package.

```
npm install -g sequelize-cli

```
Installing Sequelize and mysql2


```
 npm i --save sequelize mysql2
```

## Step 4.2:  We initialize Sequelize
  :feet:
  ***

```
sequelize init

```
With this sequelize-cli created a base structure for us at the root of our project,
if you inspect your directory at this point, you will notice that this create tow directories,
create a new folder named models and create a new file named index.js in the models folder and
create a new folder named config and create a new file named config.json in the models folder.

Your directory structure should now look like this:


```
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

```
Do not modify anything from the server / models / index.js file that was generated automatically
If we check the ./config/config.json file, we see that we have 3 options for connecting to a database,

This config.json file  will be used by Sequelize to manage different environments.
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
modifiquemos la opción “development”:


```
"development": {
    "username": "root",
    "password": "yourpasword",
    "database": "yournamedatabase",
    "host": "127.0.0.1",
    "dialect": "mysql",
    },
   
```

Now let's check the ./models/index.js file. This file has the function of creating a new instance of Sequelize each time it is called, and its default environment variable is “development”, which will use the database, host, user, password and options that we just added.
```

```




## Step 4.3: Generating Models to create table
  :feet:
  ***


Now again we will use the sequelize cli command to generate model files and migrations.
We will have tow models: User and password


```
sequelize model:create --name useasdsaasdr --attributes "email:[type:string,unique:true,allowNull:false,{validate:{isEmail:true}}]",password:[type:STRING,allowNull:false]
```
This automatically inside of  /models, create a file called user.js and look like this

```

'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

```

We modify the user.js file  to place the following code in it:
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

Define Routes

Now run:

```
node server.js
```
You should see the table create in worbench . This means that our Sequelize models have been synced successfully, and if you check your database you should see a users table with the columns specified present.


Define Routes

Your routes/api-routes.js should look like this

```
// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};

```
Your routes/api-routes.js should look like this
```
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};

```


Then, in our /public  folder, we create a new file and name it login.html.

```
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Passport Authentication</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/lumen/bootstrap.min.css">
  <link href="stylesheets/style.css" rel="stylesheet">
</head>

<body>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h2>Login Form</h2>
        <form class="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="email-input" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="password-input" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-default">Login</button>
        </form>
        <br />
        <p>Or sign up <a href="/">here</a></p>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="js/login.js"></script>

</body>

</html>

```
Then, in our /public  folder, we create a new file and name it members.html.


```
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Passport Authentication</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/lumen/bootstrap.min.css">
  <link href="stylesheets/style.css" rel="stylesheet">
</head>

<body>
  <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/logout">
        Logout
      </a>
    </div>
  </div>
</nav>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h2>Welcome <span class="member-name"></span></h2>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="js/members.js"></script>

</body>

</html>

```
Then, in our /public  folder, we create a new file and name it signup.html.
```
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Passport Authentication</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/lumen/bootstrap.min.css">
  <link href="stylesheets/style.css" rel="stylesheet">
</head>

<body>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h2>Sign Up Form</h2>
        <form class="signup">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="email-input" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="password-input" placeholder="Password">
          </div>
          <div style="display: none" id="alert" class="alert alert-danger" role="alert">
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span class="sr-only">Error:</span> <span class="msg"></span>
          </div>
          <button type="submit" class="btn btn-default">Sign Up</button>
        </form>
        <br />
        <p>Or log in <a href="/login">here</a></p>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="js/signup.js"></script>

</body>

</html>

```

## Step 5. Write a passport
  :feet:
  ***


Then, in our /config  folder, we create a new file and name it passport.js. This file will contain our passport strategies.

In passport.js, We will use the user model and the passport, create a file called passport.js and place the following code in it:

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
      //the password is saved as hash not clear text
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

Verify we require  “passport.js” in our “server.js” file. Add the following line below :

```
require('./config/passport');
```

## Step 6. Test Aplication
  :feet:
  ***



```
npm server.js
```
 Open the browser and write 
 ```
http://localhost:8080/
 ```
![demo](https://github.com/rakeru2006/nodejs-express-sequelize-mysql/blob/main/test1.png)
 ***

![demo](https://github.com/rakeru2006/nodejs-express-sequelize-mysql/blob/main/test3.png)
 ***
 Verify in Mysql Workbench 
![demo](https://github.com/rakeru2006/nodejs-express-sequelize-mysql/blob/main/test4.png)

