const mongoose = require("mongoose");
const userSchema = require("./schema");

const decorateWithHooks = require("./hooks");

decorateWithHooks(userSchema);

const User = mongoose.model("User", userSchema);

module.exports = User;
