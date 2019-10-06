var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
var nameSchema = new mongoose.Schema({
    firstName: {
      type:String,
      trim:true,
      required:true,
      unique:true

    },
    lastName: String,
    password: {
    
    type:String,
    validate:[
    
    function(password){

      password.length >= 6;
    },
    'password should be longer'

    ]
  },
    city:String,
    created:{
      type : Date,
      default:Date.now
    },
    email:{
      type:String,
      index:true,
      match:/.+\@.+\..+/,
      required:'Email address is required',
      trim:true
    }
});
var User = mongoose.model("User", nameSchema);
module.exports=User;