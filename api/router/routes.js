const { stateController } = require("../controllers/index");
const { genderController } = require("../controllers/index");
const { ageController } = require("../controllers/index");
const { educationController } = require("../controllers/index");

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
  {
    method: "GET",
    path: "/age",
    handler: ageController.getAgeData.bind(ageController),
  },
  {
    method: "POST",
    path: "/age",
    handler: ageController.createAgeData.bind(ageController),
  },
  {
    method: "PATCH",
    path: "/age",
    handler: ageController.updateAgeData.bind(ageController),
  },
  {
    method: "DELETE",
    path: "/age",
    handler: ageController.deleteAgeData.bind(ageController),
  },
  {
    method: "GET",
    path: "/education",
    handler: educationController.getEducationData.bind(educationController),
  },
  {
    method: "POST",
    path: "/education",
    handler: educationController.createEducationData.bind(educationController),
  },
  {
    method: "PATCH",
    path: "/education",
    handler: educationController.updateEducationData.bind(educationController),
  },
  {
    method: "DELETE",
    path: "/education",
    handler: educationController.deleteEducationData.bind(educationController),
  },
];

module.exports = routes;
