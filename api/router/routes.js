const { stateController } = require("../controllers/index");
const { genderController } = require("../controllers/index");

const routes = [
  {
    method: "GET",
    path: "/states",
    handler: stateController.getStatesData.bind(stateController),
  },
  {
    method: "POST",
    path: "/states",
    handler: stateController.createStateData.bind(stateController),
  },
  {
    method: "PATCH",
    path: "/states",
    handler: stateController.updateStateData.bind(stateController),
  },
  {
    method: "DELETE",
    path: "/states",
    handler: stateController.deleteStatesData.bind(stateController),
  },
  {
    method: "GET",
    path: "/gender",
    handler: genderController.getGenderData.bind(genderController),
  },
  {
    method: "POST",
    path: "/gender",
    handler: genderController.createGenderData.bind(genderController),
  },
  {
    method: "PATCH",
    path: "/gender",
    handler: genderController.updateGenderData.bind(genderController),
  },
  {
    method: "DELETE",
    path: "/gender",
    handler: genderController.deleteGenderData.bind(genderController),
  },
];

module.exports = routes;
