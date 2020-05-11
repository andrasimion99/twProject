const { userController } = require("../controllers/index");

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
];

module.exports = routes;
