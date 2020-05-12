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

const checkPassword = async function (token, currentPassword) {
  const user = await this.findOne({ token: token });
  if (!user) {
    throw new Error("User not found. Not logged in.");
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Unable to change password.");
  }
  return user;
};

module.exports = {
  findByCredentials,
  validateEmail,
  checkPassword,
};
