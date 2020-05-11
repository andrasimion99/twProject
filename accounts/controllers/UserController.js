const helpers = require("./../common/helpers");

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
    if (email === ADMIN_EMAIL) {
      userData.userType = "admin";
    }
    try {
      const user = new this.db.User(userData);
      await user.save();
      return helpers.success(res, user);
    } catch (error) {
      return helpers.error(res, error);
    }
  }
}

module.exports = UserController;
