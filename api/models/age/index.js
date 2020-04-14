const mongoose = require("mongoose");
const ageSchema = require("./schema");

/*const statics = require("./statics");
const methods = require("./methods");

Object.assign(ageSchema.methods, methods);
Object.assign(ageSchema.statics, statics);*/

const Age = mongoose.model("Age", ageSchema, "age");

module.exports = Age;
