const { stateController } = require("../controllers/index");

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
];

module.exports = routes;
