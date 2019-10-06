**User-Authentication-System-in-Node.js**
- In this mini project,I will be discussing about many of the important things that you should know for developing a web application using Node.js.Don"t judge for the front end .I am just implementing all the functionalities.

- You will learn about the express.js framework and various middlewares used in express.js.
- How to implement routing in your application
- How to create a log files in your web application.
- How to create sessions in your web application.
- How to use view engine in your application.
- How to flash messages.
- How to hash the password before storing it in the database. 
- How to insert data in to MongoDB(NOSQL Database) using Node.js. 
- How to deploy your data on the cloud (mLAB)
- How to host your site on Github Pages


**Technologies Used**

- Node.js(v 8.12.0)
- Express.js
- MongoDB(NOSQL Database)(4.0)
- HTML,CSS,JS,Bootstrap

**Framework used: Express.js**

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is an open source framework developed and maintained by the Node.js foundation.

**Middleware in Node.js and its working**

 Middlewares are the functions that have access to the request and response object and the next middleware function in the applications request-response cycle.

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.
- If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

**Middleware functions that we have used and their explanation:**

1.body-parser :It is a node.js parsing middleware.It parses the incoming request to the req.body property.It is a third party middleware.

--Installation:
     --use NPM for installing body-Parser
           --npm install body-parser --g
           
--include body-parser in your application

     var express = require("express");
     var bodyParser = require("bodyParser");
     var app=express();
     
     //create application/jsonparser
     var jsonParser=bodyParser.json();
     
     // create application/x-www-form-urlencoded parser
     var urlencodedParser=bodyParser.urlencoded({extended:false});
     
     //When extended property is set to true, the URL-encoded data will be parsed with the qs library.when extended property is set to        false, the URL-encoded data will instead be parsed with the querystring library.
     
     // POST /login gets urlencoded bodies
     //username is available under the req.body property of bodyParser
     app.post('/login',urlencodedParser,function(req,res){
                 res.send('hello'+req.body.username)
                 })
                 
     // POST /api/users gets JSON bodies
      app.post('/api/users', jsonParser, function (req, res) {
                    // create user in req.body
                     })
                     
      //listener event
      app.listen('7000',function(req,res){
            console.log("Welcome,you are listening to the port 7000)
            })
            
 2.express.static() :It is a built in middleware provided by the express.js.It is useful for serving static files like images,HTML,CSS,JS.
 
   --using express.static() in your app.js
   
   i>Consider a public directory in which the following things are included:
                          server.js
                          public-
                              public/images
                              public/images/logo.png
                              public/index.html
                              
   ii>Now I will write a code for serving the static files using express.static()
                                 
                          var express = require("express");
                          var bodyParser=require("body-parser");
                          var app=express();
                          app.use(bodyParser.json());
                          app.use(bodyParser.urlencoded({extended:false});
                          app.use(express.static(__dirname+'/public');
                          //localhost:7000
                          app.get('/',function(req,res){
                                res.send("Hello World!!");
                                })
                         //localhost:7000/index
                         
                         app.get('/index.htm',function(req,res){
                         
                         res.sendFile(__dirname + "/" +"index.htm");
                         })
                         //localhost:7000/images/logo.png will show image
                         
                         
                          //listener event
                       app.listen('7000',function(req,res){
                            console.log("Welcome,you are listening to the port 7000)
                             })
  
  3.morgan middleware : It is a logging middleware for our node.js applications.
    ** API **
                              
                               var express = require('express')
                               var morgan  = require('morgan')
                               var app = express()
                               app.use(morgan())
     
   **Modules Used**:
   
   - fs(File System):
            -It is used to to access physical file system. It is responsible for all the asynchronous or synchronous   file I/O  operations.<br/>
            
   - path: The Path module provides a way of working with directories and file paths.It can be used for extracting the file system   paths.
   
   **Code for creating log file for you app**
                                               
                          var express = require("express");
                          var bodyParser=require("body-parser");
                          //requiring filestream module
                          var fs = require("fs");
                          //requiring path module
                          var path = require("path");
                          
                          //requiring the morgan middleware
                          var morgan = require("morgan");
                          //creating a writestream in append mode
                          var accessLogStream=fs.createWriteStream(path.join(__dirname,'accesslog'),{flags:'a'});
                          //set up the logger
                          app.use(morgan('combined',{stream:accessLogStream})) 
                          app.use(bodyParser.json());
                          app.use(bodyParser.urlencoded({extended:false});
                          app.use(express.static(__dirname+'/public');
                          //localhost:7000
                          app.get('/',function(req,res){
                                res.send("Hello World!!");
                                })                  
                          //listener event
                       app.listen('7000',function(req,res){
                            console.log("Welcome,you are listening to the port 7000)
                             })
                             
   4.**express-session:**
   
   - All web applications work through HTTP protocol, which is stateless. That means HTTP doesn't remember or record details of any          request. It only takes the request to the web server, and then it serves the response back to the browser.This is not enough, as        user identity is required for operations followed by login. So a session is created upon user login, and it can be used to hold          any information/attributes required between requests until logout.
     
   - Sessions can be maintained using hidden form fields, cookies, or http session.
     
   - It restricts the user from accesing the unauthorized route means user can access specific routes only when the session is created        for the user and server identifies the user based on the credentials entered by him like username and password.
   
   - Implementing sessions using express-session middleware:
          -session will be created each time when user login in to the system and session will be destroyed when the user logout from 
           the system.
                      
                       var express = require("express");
                       var app = express();
                       //now session will have access to the express-session middleware
                       var session = require("express-session");
                       //here keys is a file name ,storing secret in a different file is a good practice
                       app.use(session({
                       cookie:{
                       Name:'session',
                       maxAge:10*60*1000,
                       },
                       secret:keys.sessionSecret,
                       resave:false,
                       saveUninitialized:true
                       }))
                       
           -we use express.Router middleware for the routing purpose,now I will explain about how to restrict the user from accessing               the unauthorized route if the session is not created for him
                         router.get('/dashboard',function(req,res){
                                   if(req.session && req.session.user){
                                              User.findOne({firstName:req.session.user.firstName}).exec(function(err,user)
                                                            {
                                                            if(!user)
                                                                 {
                                                                   req.session.reset();
                                                                    res.redirect('/login');
                                                                         }
                                else
                                      {
                                          req.user = user;
                                          delete req.user.password; // delete the password from the session
                                          req.session.user = user;  //refresh the session value
                                          res.locals.user = user;
                                          res.render('dashboard');
                                        }
                             });
                                 }
                                            else{
                                         res.redirect('/login');
                                                }});
   5.**bcrypt-nodejs:** 
   
   - It is a middleware function that is used for password hashing.It always hashes every password with a salt.
   
   - Better way to store a password is to add a salt to the hashing function-adding additional random data to the input of a hashing         function that makes each password hash unique.
   
   - Implementation of bcrypt-nodejs:
                  app.js
                  
                  //hashing the password
                  const express=require("express");
                  const app = express();
                  const bcrypt = require("bcrypt-nodejs");
                  const saltrounds=10;
                  const password="randomstring";
                  bcrypt
                    .hash(password, saltRounds)
                     .then(hash => {
                                    console.log(`Hash: ${hash}`);
                                          // Store hash in your password DB.
                                          })
                         .catch(err => console.error(err.message));
                   
                   //validating a password with a hash,saltRounds is a work or cost factor ,more the salt rounds more will be the time                      taken for the operation 
                   
                   // app.js

                   const bcrypt = require("bcrypt");
                   const password = "randomstring";
                   const hash = "$2b$10$69SrwAoAUNC5F.gtLEvrNON6VQ5EX89vNqLEqU655Oy9PeT/HRM/a";
                   bcrypt
                     .compare(password, hash)
                           .then(res => {
                            console.log(res);
                                })
                      .catch(err => console.error(err.message));
                      
                   //In this case, res is true, indicating that the password provided, when hashed, matched the stored hash.
                   //2 major funtions in bcrypt-nodejs
                      i>bcrypt.hashSync(password, bcrypt.genSaltSync(10)):Hash the password with the saltrounds
                      ii>bcrypt.compareSync(password, user.password):compare the hashed password with the entered password
                      
  **View Engine used :(EJS)**
  
  - There are various types of engines that we can use for our application(pug,handlebars) but I prefer to use EJS to template node application.This  is because syntax of EJS is similar to HTML.Therefore it is easy to learn.We use EJS to include repeatable parts of our website(partials) and pass data to our views.
  
  - I am going to give you a layout of how to use EJS in your application
  
  - folder structure:
             -views
                   -partials
                         -nav.ejs
                   -login.ejs
                   -reg.ejs
                   -logout1.ejs
                   -dashboard.ejs
              -server.js
              
   -partials folder will contain the files which we can reuse in our website by just including it in the other views
   
   
   -example1 : to include repeatable parts of our website(partials).As we all know that navbar is included in almost every page of our application ,so why to write code again and again in the another file to include navbar.Using EJS,saves us from writing code again and again.
         <% include partials/nav1.ejs%> is used to include nav1.ejs template in the login.ejs template
          ** login.ejs **
           
           <body>
           <% include partials/nav1.ejs%>
           <h1 align="center" >Login Here</h1>
           <div id="login">
           <form action="/login" method="post" role="form" class="loginForm">
           <div class="form-group">
           <input type="text" class="form-control br-radius-zero" name="firstName" placeholder="Enter  your First Name:" id="name">
           </div>
           <div class="form-group">
           <input type="password" class="form-control br-radius-zero" placeholder="Enter  your Password:" name="password" id="psd">
           </div>
          <button type="submit" class="btn btn-primary" id="button" value="Login">Login</button>
          </form>
          </div>
          </body>
    
   -example2 : passing data to our views
      routes.js
      
      //here we are including the usermodel in User variable ,hence it is storing all the information related to usermodel in models           directory
      var User = require('../models/usermodel');
      
      //passing data to our views
      
      router.get("/reg", function(req, res) {
      res.render('reg',{user:req.user});
      });
      
      
   **DATABASE(MongoDB)**
     -Horizontal Scaling (Sharding)
     -Replica set
     -Schemaless structure
     -Higher throughput
     -record is stored in form of documents
     
   **Mongoose**
 - Mongoose is a ODM(Object Data Modelling) technique.It is a node.js module that provides developers with the ability to model
   objects and save them as MongoDB documents.
   
 -Installing Mongoose:
        npm install mongoose 
    
   **Connecting to MongoDB:**
   
 - You will need MongoDB connection URI ,that tells the MongoDB drivers how to connect to the database instance.MongoDB URI is   constructed as follows:-
                          mongodb://username:password@hostname:port/database
                             -while connecting to local instance skip the username and password
                             
                         var mongoose = require("mongoose");
                         mongoose.Promise = global.Promise;
                         mongoose.connect("mongodb://localhost:27017/userlogin",{ useNewUrlParser: true ,useUnifiedTopology:true});
                
        - useUnifiedTopology : handles monitoring all the servers in a replica set or sharded cluster.
        - useNewUrlParser: used for parsing the connection string
                       
  -storing the URI directly in the file is a bad practice,
    - use environment configuration file for this
                                     config/env/development.js file
                                      
                                      module.exports={
                                      db: 'mongodb://localhost:27017/databasename',
                                      sessionsecret:'raandomstringgoeshere'
                                       };
                     
   - Now in  your config folder,create a file named mongoose.js that contains following code-
                                     
                                      var config = require('./config'),
                                      var mongoose = require('mongoose');
                                      
                                      module.exports = function(){
                                      var db = mongoose.connect(config.db);
                                      return db;
                                      };
   - Now make changes to your server.js file with following code-
   
                                  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
                                  var mongoose = require('./config/mongoose');
                                  var express = require('./config/express');
                                  var db = mongoose;
                                  var app = express();
                                  app.listen('3000',function(req,res){
                                  console.log('Welcome',You are listening to port 3000);
                                  })
 
 **Mongoose Schemas**
 
- Creating the user schema and model: Mongoose uses Schema object to define the document list of properties,each with its own type and constraints.After creating the schema you have to  define the model constructor that you will use to create the instances of MongoDB documents.Using this instances we will create,retrieve,update and delete the user documenst i.e can perform CRUD Operations.4 
                              
                               var mongoose= require("mongoose");
                               mongoose.Promise=global.Promise;
                               mongoose.set('useCreateIndex',true);
                               var userSchema = new mongoose.schema({
                                      firstName:String,
                                      lastName:String,
                                      email:String,
                                      username:String,
                                      password:String
                               )};
                               var User = mongoose.model("User", nameSchema);
                               module.exports=User;
                               //this will create a collection named 'users',where we can store our data in the  key-value pair.
                               
 -User Registration:
 ![image](https://user-images.githubusercontent.com/26309496/66259137-1ea4b980-e7cb-11e9-9dff-2b99daaf417b.png)
 
 -Fill the registration form and press submit button,user is successfully created.We can see it in console.
 ![image](https://user-images.githubusercontent.com/26309496/66259159-590e5680-e7cb-11e9-8da6-5740a447dd0b.png)
 -Also we can look if the data is stored in database or not-
 ![image](https://user-images.githubusercontent.com/26309496/66259190-b1455880-e7cb-11e9-8174-9c43d3e2efd9.png)
     Here we can see that our entered data is stored in MongoDB database and the password is hashed :)
 -Now we can login ,if our credentials are correct we will be taken to dashboard otherwise login page will be displayed.
 ![image](https://user-images.githubusercontent.com/26309496/66259221-008b8900-e7cc-11e9-9a9d-92f10f042b36.png)
 -Successfully logged in to the system,hurray........
 ![image](https://user-images.githubusercontent.com/26309496/66259223-11d49580-e7cc-11e9-9b1a-c94c2c4dee90.png)
 
 -now after logging out it will display following window:
 ![image](https://user-images.githubusercontent.com/26309496/66259242-40eb0700-e7cc-11e9-8f7c-1d771971058f.png)
 
 -We cannot access dashboard if we are not logged in to the system because we have restricted the user from accessing it if he is not logged in.We have implemented this by using session,which keeps look on the user.
 
 
 -Now I will teach you how to store data in the remote database ,we  will use Database-as-a -service for MongoDB by mLAB which is a MongoDB Company.mLAB provides fully managed cloud database service.
 
 **Steps to store your data in the cloud database using mLAB**
 -Navigate to www.mlab.com and sign up if you did not have account otherwise just login in to the site.
 ![image](https://user-images.githubusercontent.com/26309496/66259470-0040bd00-e7cf-11e9-94c2-597d52551c40.png)
 ![image](https://user-images.githubusercontent.com/26309496/66259479-3120f200-e7cf-11e9-8de2-ffa6c0e20555.png)
 -After logging in you will be taken to the home page ,click on create new button in upper right corner:
 ![image](https://user-images.githubusercontent.com/26309496/66259506-6c232580-e7cf-11e9-8e09-a7a5a5060f88.png)
 -A new page will be displayed ,you have to choose the SANDBOX plan and press continue.
       ![image](https://user-images.githubusercontent.com/26309496/66259560-f3709900-e7cf-11e9-9075-f497fe4d28c6.png)
 -Enter database name and in next page submit the order
 ![image](https://user-images.githubusercontent.com/26309496/66259570-1ef38380-e7d0-11e9-98f4-8204028b5860.png)
 -Now you will be taken to homepage and you will notice that your database will be shown their
 ![image](https://user-images.githubusercontent.com/26309496/66259589-4fd3b880-e7d0-11e9-801a-84f812acf1fa.png)
-click on the databse url and you will be taken to new page,notice the MongoDBURI pattern ,for using this service click on users and create new user of the database
![image](https://user-images.githubusercontent.com/26309496/66259613-91fcfa00-e7d0-11e9-9a9d-4892c0c73e6e.png)

Users->Add Database User->Enter username and password thats all!!

![image](https://user-images.githubusercontent.com/26309496/66259624-b3f67c80-e7d0-11e9-84d2-cbf055a11a86.png)

-Use this connection string in node.js app for connecting to remote database and here use your username and password in place of the dbuser and dbpassword

![image](https://user-images.githubusercontent.com/26309496/66259667-47c84880-e7d1-11e9-96a7-08bc175cc9c2.png)

-change in code in server.js 
![image](https://user-images.githubusercontent.com/26309496/66265569-7af0f300-e836-11e9-96a0-a35ad46b6a0a.png)
-error you may get,infact many of people get this error
![image](https://user-images.githubusercontent.com/26309496/66265824-6a427c00-e83a-11e9-8249-273640eff452.png)
**solution to the eror:**
-Make sure that your mongoose version is compatible with mongoDB driver
-You should not use proxy network
-Make sure that you have created user for the database and password should contain only alphanumeric characters.



![image](https://user-images.githubusercontent.com/26309496/66265963-4849f900-e83c-11e9-87ed-b03da97886c2.png)

![image](https://user-images.githubusercontent.com/26309496/66265988-8c3cfe00-e83c-11e9-8a5d-ccb2c1b6895f.png)

Hurray!!!!
Mohit Sood
  
 
 
 
 
  
 
                        
                         
                         
                    
                              
          
      

                  
    


                         
                         
                         
                       
                
                        
                        
                         
                                                                      
                                            
                           
       
  
 
       
                 
     
      
      
     




