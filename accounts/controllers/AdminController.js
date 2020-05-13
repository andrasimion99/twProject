const helpers = require("./../common/helpers");

class AdminController {
  constructor({ db, services }) {
    this.db = db;
    this.services = services;
  }

  async restrict(req, res, param, body) {
    const { token } = body;
    const { email } = body;
    try {
      const admin = await this.db.User.findOne({
        token: token,
        userType: "admin",
      });
      if (admin) {
        const validEmail = await this.db.User.validateEmail(email);

        if (!validEmail) {
          return helpers.error(res, "The email is not valid.");
        }

        const user = await this.db.User.updateOne(
          { email: email },
          {
            restricted: true,
          }
        );
        return helpers.success(res, user);
      } else {
        throw new Error("You don't have permission to restrict a user.");
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async unrestrict(req, res, param, body) {
    const { token } = body;
    const { email } = body;
    try {
      const admin = await this.db.User.findOne({
        token: token,
        userType: "admin",
      });
      if (admin) {
        const validEmail = await this.db.User.validateEmail(email);

        if (!validEmail) {
          return helpers.error(res, "The email is not valid.");
        }

        const user = await this.db.User.updateOne(
          { email: email },
          {
            restricted: false,
          }
        );
        return helpers.success(res, user);
      } else {
        throw new Error("You don't have permission to unrestrict a user.");
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }
}

module.exports = AdminController;
