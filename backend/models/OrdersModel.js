const {model} = require('mongoose');

const {OrdersSchema, OrderSellSchema} = require('../Schemas/OrdersSchema');


const OrdersModel = new model("Order", OrdersSchema);
const OrderSellModel = new model("OrderSell", OrderSellSchema);

module.exports = {OrdersModel, OrderSellModel};