const { userController } = require("../controllers/index");
const { adminController } = require("../controllers/index");

const routes = [
  {
    method: "GET",
    path: "/api/users",
    handler: userController.getUsers.bind(userController),
  },
  {
    method: "POST",
    path: "/api/users/register",
    handler: userController.register.bind(userController),
  },
  {
    method: "DELETE",
    path: "/api/users",
    handler: userController.deleteAllUsers.bind(userController),
  },
  {
    method: "POST",
    path: "/api/users/restrict",
    handler: adminController.restrict.bind(adminController),
  },
  {
    method: "POST",
    path: "/api/users/unrestrict",
    handler: adminController.unrestrict.bind(adminController),
  },
  {
    method: "POST",
    path: "/api/users/login",
    handler: userController.login.bind(userController),
  },
  {
    method: "POST",
    path: "/api/users/logout",
    handler: userController.logout.bind(userController),
  },
  {
    method: "POST",
    path: "/api/users/profile",
    handler: userController.updateProfile.bind(userController),
  },
  {
    method: "POST",
    path: "/api/users/changePassword",
    handler: userController.changePassword.bind(userController),
  },
];

module.exports = routes;
