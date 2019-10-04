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
            
 2.express.static :It is a built in middleware provided by the express.js.It is useful for serving static files like images,HTML,CSS,JS.
 
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
                         
                         
                                                                      
                                            
                           
       
  
 
       
                 
     
      
      
     




