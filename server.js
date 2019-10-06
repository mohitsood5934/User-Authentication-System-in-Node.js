
var express = require("express");
var fs = require("fs");
var path = require("path");
var keys= require('./config/keys');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var morgan = require('morgan');
var session = require('express-session');
var flash = require("connect-flash");
var ejs = require("ejs");

//database connection setup
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost:27017/userlogin",{ useNewUrlParser: true ,useUnifiedTopology:true});   =>local database URI
mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds229068.mlab.com:29068/userauth",{ useNewUrlParser: true ,useUnifiedTopology:true})
.then(() => console.log('connection successful'))
.catch((err) => console.log(err));

// database connection end
var users = require('./models/usermodel');
var routes= require('./routes/routes');


var app = express();

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
//create a write stream in append mode
var accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
//set up the logger
app.use(morgan('combined',{stream:accessLogStream}))
app.use(session({
  cookie: {
    Name:'session',
    maxAge:10 * 60 * 1000,
},
  secret: keys.sessionSecret,
  resave:false,
  saveUninitialized:true
  
}))
app.use(flash());



 
app.use('/',routes);
app.use('/users',users);
//set port
app.listen('7000',function(req,res){
console.log("You are listening to port 7000");
}) 
