const mongoose = require("mongoose");
const userSchema = require("./schema");

const statics = require("./statics");
const methods = require("./methods");
const decorateWithHooks = require("./hooks");

Object.assign(userSchema.methods, methods);
Object.assign(userSchema.statics, statics);
decorateWithHooks(userSchema);

const User = mongoose.model("User", userSchema);

module.exports = User;
