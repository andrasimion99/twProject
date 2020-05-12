const helpers = require("./../common/helpers");

class AdminController {
  constructor({ db, services }) {
    this.db = db;
    this.services = services;
  }

  async restrict(req, res, param, body) {
    const { token } = body;
    try {
      const admin = await this.db.User.findOne({
        token: token,
        userType: "admin",
      });
      if (admin) {
        if (Object.keys(param).length == 0 || !param.id) {
          return helpers.error(
            res,
            "The id of the user you want to restrict is not valid"
          );
        } else {
          const user = await this.db.User.updateOne(
            { _id: param.id },
            {
              restricted: true,
            }
          );
          return helpers.success(res, user);
        }
      } else {
        throw new Error("You don't have permission to restrict a user.");
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async unrestrict(req, res, param, body) {
    const { token } = body;
    try {
      const admin = await this.db.User.findOne({
        token: token,
        userType: "admin",
      });
      if (admin) {
        if (Object.keys(param).length == 0 || !param.id) {
          return helpers.error(
            res,
            "The id of the user you want to unrestrict is not valid"
          );
        } else {
          const user = await this.db.User.updateOne(
            { _id: param.id },
            {
              restricted: false,
            }
          );
          return helpers.success(res, user);
        }
      } else {
        throw new Error("You don't have permission to unrestrict a user.");
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }
}

module.exports = AdminController;
