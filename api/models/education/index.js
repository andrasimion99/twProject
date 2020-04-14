const mongoose = require("mongoose");
const educationSchema = require("./schema");

/*const statics = require("./statics");
const methods = require("./methods");

Object.assign(educationSchema.methods, methods);
Object.assign(educationSchema.statics, statics);*/

const Education = mongoose.model("Education", educationSchema, "education");

module.exports = Education;
