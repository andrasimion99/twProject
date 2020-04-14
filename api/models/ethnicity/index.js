const mongoose = require("mongoose");
const ethnicitySchema = require("./schema");

/*const statics = require("./statics");
const methods = require("./methods");

Object.assign(ethnicitySchema.methods, methods);
Object.assign(ethnicitySchema.statics, statics);*/

const Ethnicity = mongoose.model("Ethnicity", ethnicitySchema, "ethnicity");

module.exports = Ethnicity;
