const jwt = require("jsonwebtoken");

const generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secretkey");
  user.token = token;
  await user.save();
  return token;
};

module.exports = {
  generateAuthToken,
};
