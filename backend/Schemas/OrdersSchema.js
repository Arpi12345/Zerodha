const {Schema} = require('mongoose');
const { type } = require('../Validators/ValidatorSignup');

const OrdersSchema = new Schema({
      username:{type: String, required: true},
    name: String,
    price: Number,
    qty: Number,
    mode: String,

   

});


const OrderSellSchema = new Schema({
     username:{type: String, required: true},
    name: String,
    price: {
      type:Number,
      min:0,
    },
    qty:{
      type:Number,
      min:1,
    },
    mode: {
      type: String,
     enum: ["Buy", "Sell"],
    },
    cheque: Number,
});
module.exports = {OrdersSchema, OrderSellSchema};