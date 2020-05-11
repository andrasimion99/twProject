const db = require("../models/index");

const UserController = require("./UserController");

const userController = new UserController({
  db: {
    User: db.User,
  },
  services: {},
});

module.exports = {
  userController,
};
