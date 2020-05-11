const { userController } = require("../controllers/index");
const { adminController } = require("../controllers/index");

const routes = [
  {
    method: "GET",
    path: "/api/users",
    handler: userController.getAllUsers.bind(userController),
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
    method: "PATCH",
    path: "/api/users/restrict",
    handler: adminController.restrict.bind(adminController),
  },
  {
    method: "PATCH",
    path: "/api/users/unrestrict",
    handler: adminController.unrestrict.bind(adminController),
  },
];

module.exports = routes;
