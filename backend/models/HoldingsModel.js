const {model} = require('mongoose');

const {HoldingsSchema} = require('../Schemas/HoldingsSchema');

const HoldingsModel = new model("Holding", HoldingsSchema);


module.exports = {HoldingsModel};