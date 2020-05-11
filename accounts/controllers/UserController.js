const helpers = require("./../common/helpers");
const jwt = require("jsonwebtoken");

const ADMIN_EMAIL = "admin@gmail.com";

const CREATED = 201;
const NO_CONTENT = 204;

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

    const validEmail = await this.db.User.validateEmail(userData.email);

    if (!validEmail) {
      return helpers.error(res, "The email is not valid.");
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
      return helpers.success(res, user, CREATED);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async deleteAllUsers(req, res, param) {
    try {
      const users = await this.db.User.deleteMany({});
      return helpers.success(res, users, NO_CONTENT);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async login(req, res, param, body) {
    const { email, password } = body;
    try {
      const user = await this.db.User.findByCredentials(email, password);
      console.log(user);
      await user.generateAuthToken(user);
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

  async updateProfile(req, res, param, body) {
    const { token } = body;
    try {
      const user = await this.db.User.updateOne({ token: token }, body);
      return helpers.success(res, user);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async isLoggedIn(token) {
    try {
        const { _id } = jwt.verify(token, "secretkey");
        const user = await this.db.User.find({
            _id,
            token: token,
        });
        if (!user) {
            throw new Error('Not authorized');
        }
        return { success: true, data: { token, user } };
    } catch (error) {
        return {
            success: false,
            error: { message: error.message },
        };
    }
}
}

module.exports = UserController;