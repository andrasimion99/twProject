const { stateController } = require("../controllers/index");
const { genderController } = require("../controllers/index");
const { ageController } = require("../controllers/index");
const { educationController } = require("../controllers/index");
const { ethnicityController } = require("../controllers/index");
const { incomeController } = require("../controllers/index");

const routes = [
  {
    method: "GET",
    path: "/api/states",
    handler: stateController.getStatesData.bind(stateController),
  },
  {
    method: "POST",
    path: "/api/states",
    handler: stateController.createStateData.bind(stateController),
  },
  {
    method: "PATCH",
    path: "/api/states",
    handler: stateController.updateStateData.bind(stateController),
  },
  {
    method: "DELETE",
    path: "/api/states",
    handler: stateController.deleteStatesData.bind(stateController),
  },
  {
    method: "GET",
    path: "/api/gender",
    handler: genderController.getGenderData.bind(genderController),
  },
  {
    method: "POST",
    path: "/api/gender",
    handler: genderController.createGenderData.bind(genderController),
  },
  {
    method: "PATCH",
    path: "/api/gender",
    handler: genderController.updateGenderData.bind(genderController),
  },
  {
    method: "DELETE",
    path: "/api/gender",
    handler: genderController.deleteGenderData.bind(genderController),
  },
  {
    method: "GET",
    path: "/api/age",
    handler: ageController.getAgeData.bind(ageController),
  },
  {
    method: "POST",
    path: "/api/age",
    handler: ageController.createAgeData.bind(ageController),
  },
  {
    method: "PATCH",
    path: "/api/age",
    handler: ageController.updateAgeData.bind(ageController),
  },
  {
    method: "DELETE",
    path: "/api/age",
    handler: ageController.deleteAgeData.bind(ageController),
  },
  {
    method: "GET",
    path: "/api/education",
    handler: educationController.getEducationData.bind(educationController),
  },
  {
    method: "POST",
    path: "/api/education",
    handler: educationController.createEducationData.bind(educationController),
  },
  {
    method: "PATCH",
    path: "/api/education",
    handler: educationController.updateEducationData.bind(educationController),
  },
  {
    method: "DELETE",
    path: "/api/education",
    handler: educationController.deleteEducationData.bind(educationController),
  },
  {
    method: "GET",
    path: "/api/ethnicity",
    handler: ethnicityController.getEthnicityData.bind(ethnicityController),
  },
  {
    method: "POST",
    path: "/api/ethnicity",
    handler: ethnicityController.createEthnicityData.bind(ethnicityController),
  },
  {
    method: "PATCH",
    path: "/api/ethnicity",
    handler: ethnicityController.updateEthnicityData.bind(ethnicityController),
  },
  {
    method: "DELETE",
    path: "/api/ethnicity",
    handler: ethnicityController.deleteEthnicityData.bind(ethnicityController),
  },
  {
    method: "GET",
    path: "/api/income",
    handler: incomeController.getIncomeData.bind(incomeController),
  },
  {
    method: "POST",
    path: "/api/income",
    handler: incomeController.createIncomeData.bind(incomeController),
  },
  {
    method: "PATCH",
    path: "/api/income",
    handler: incomeController.updateIncomeData.bind(incomeController),
  },
  {
    method: "DELETE",
    path: "/api/income",
    handler: incomeController.deleteIncomeData.bind(incomeController),
  },
];

module.exports = routes;
