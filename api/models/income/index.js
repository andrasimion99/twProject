const mongoose = require("mongoose");
const incomeSchema = require("./schema");

/*const statics = require("./statics");
const methods = require("./methods");

Object.assign(incomeSchema.methods, methods);
Object.assign(incomeSchema.statics, statics);*/

const Income = mongoose.model("Income", incomeSchema, "income");

module.exports = Income;