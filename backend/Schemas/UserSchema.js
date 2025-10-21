const mongoose = require("mongoose");
const {Schema} = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
     email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
     },
 username:{
    type:String,
     required: [true, 'username is required'],
 },
    password:{
        type:String,
        required:[true, 'password is required'],
    },
    created_at: { type: Date, default: Date.now },
    isAdmin:{
        type:Schema.Types.Boolean,
        default: false,
    },
    
    

}, { timestamps: true });



UserSchema.pre("save", async function(next) {
 
    if (!this.isModified("password")) return next();
try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
        
    } catch (error) {
        next(error);
    }
});
UserSchema.methods.compare_password =  async  function (password){
   
    return   bcrypt.compare(password, this.password );        
    
}


  

UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    throw new Error("Token generation failed");
  }
};






module.exports = { UserSchema };