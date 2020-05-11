const db = require("../models/index");

const UserController = require("./UserController");
const AdminController = require("./AdminController");

const userController = new UserController({
  db: {
    User: db.User,
  },
  services: {},
});

const adminController = new AdminController({
  db: {
    User: db.User,
  },
  services: {},
});

module.exports = {
  userController,
  adminController,
};
