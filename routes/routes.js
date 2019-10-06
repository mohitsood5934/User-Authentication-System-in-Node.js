var express = require("express");
var bcrypt = require("bcrypt-nodejs");
var User = require('../models/usermodel');
var flash = require("express-flash");
var router = express.Router();
router.get("/", function(req, res) {

res.render('login',{ user:req.user ,messages:req.flash('info')});

});
router.get("/login", function(req, res) {
    res.render('login',{user:req.user});

});

router.get("/reg", function(req, res) {
  
    res.render('reg',{user:req.user});


});
router.get('/logout1',function(req,res){

     res.render('logout1',{user:req.user});
})

router.get('/logout',function(req,res){
console.log("logging out!!");
req.session.destroy();

res.redirect('/logout1');
});
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
}
});
router.post("/reg", function(req, res){
    
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var city = req.body.city;
    var email = req.body.email;
    
  
  //use schema.create to insert data into the db
 User.create({

    firstName: firstName,
    lastName: lastName,
    city:city,
    email:email,
    password : bcrypt.hashSync(password, bcrypt.genSaltSync(10))




 },function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log('user created', user);
      res.redirect('/login');
    }
  });
});
router.post('/login', function(req, res) {
  console.log('logging in user');
  var firstName = req.body.firstName;
  var password = req.body.password;

  User.findOne({
    firstName: firstName
  }).exec(function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.user = user;//set a cookie with user's info
        res.redirect('/dashboard');
        console.log('User found', user);
      } else {
        res.status(401).json('Unauthorized');
      }
    }
  });
});
module.exports=router;