const mongoose = require("mongoose");
const genderSchema = require("./schema");

const statics = require("./statics");
const methods = require("./methods");

Object.assign(genderSchema.methods, methods);
Object.assign(genderSchema.statics, statics);

const Gender = mongoose.model("Gender", genderSchema, "gender");

module.exports = Gender;
