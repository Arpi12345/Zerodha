const {model} = require('mongoose');
const {UserSchema} = require('../Schemas/UserSchema');

const UserModel =  new model("User", UserSchema);






module.exports = { UserModel };