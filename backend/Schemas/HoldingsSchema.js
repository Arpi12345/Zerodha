const {Schema}  = require('mongoose');
const { type } = require('../Validators/ValidatorSignup');

const HoldingsSchema = new Schema({
  
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,


});
module.exports = { HoldingsSchema }; 