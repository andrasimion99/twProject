const helpers = require("./../common/helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ADMIN_EMAIL = "admin@gmail.com";

class UserController {
  constructor({ db, services }) {
    this.db = db;
    this.services = services;
  }

  async getAllUsers(req, res, param) {
    try {
      const users = await this.db.User.find({});
      return helpers.success(res, users);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async register(req, res, param, body) {
    const { email, password } = body;
    const userData = {
      email,
      password,
    };

    const validEmail = await this.validateEmail(userData.email);

    if (!validEmail) {
      return helpers.error(res, "The email is not valid");
    }

    if (email === ADMIN_EMAIL) {
      userData.userType = "admin";
    }
    try {
      const userExists = await this.db.User.findOne({
        email: userData.email,
      });
      if (userExists) {
        return helpers.error(res, "The user is already registered.");
      }
      const user = new this.db.User(userData);
      await user.save();
      return helpers.success(res, user);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async validateEmail(email) {
    const regexEmail = /[A-Z0-9a-z._%+]+@[A-Z0-9.a-z]+\.[A-Za-z]{2,}/;
    if (email.match(regexEmail)) {
      return true;
    }
    return false;
  }

  async deleteAllUsers(req, res, param) {
    try {
      const users = await this.db.User.deleteMany({});
      return helpers.success(res, users);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async login(req, res, param, body) {
    const { email, password } = body;
    try {
      const user = await this.findByCredentials(email, password);
      await this.generateAuthToken(user);
      return helpers.success(res, user);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async logout(req, res, param, body) {
    const { token } = body;
    try {
      const user = await this.db.User.updateOne(
        { token: token },
        {
          $set: {
            token: null,
          },
        }
      );
      return helpers.success(res, user);
    } catch (error) {
      return helpers.error(res, error);
    }
  }
  async findByCredentials(email, password) {
    const user = await this.db.User.findOne({ email });
    if (!user) {
      throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    return user;
  }
  async generateAuthToken(user) {
    const token = jwt.sign({ _id: user._id.toString() }, "secretkey");
    user.token = token;
    await user.save();
    return token;
  }
}

module.exports = UserController;
