const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 10,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  userType: {
    type: String,
    required: true,
    default: "user",
  },
  restricted: {
    type: Boolean,
    required: true,
    default: false,
  },
  firstName: {
      type: String,
      required: false,
  },
  lastName: {
    type: String,
    required: false,
}
});

module.exports = userSchema;
