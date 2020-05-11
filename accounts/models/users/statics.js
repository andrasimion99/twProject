const bcrypt = require("bcryptjs");

const findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Unable to login. Email or password wrong.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login. Email or password wrong.");
  }
  return user;
};

const validateEmail = async function (email) {
  const regexEmail = /[A-Z0-9a-z._%+]+@[A-Z0-9.a-z]+\.[A-Za-z]{2,}/;
  if (email.match(regexEmail)) {
    return true;
  }
  return false;
};

module.exports = {
  findByCredentials,
  validateEmail,
};
