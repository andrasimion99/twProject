const db = require("../models/index");

const StateController = require("./StatesController");
const GenderController = require("./GenderController");
const AgeController = require("./AgeController");
const EducationController = require("./EducationController");
const EthnicityController = require("./EthnicityController");
const IncomeController = require("./IncomeController");

const stateController = new StateController({
  db: {
    State: db.State,
  },
  services: {},
});

const genderController = new GenderController({
  db: {
    Gender: db.Gender,
  },
  services: {},
});

const ageController = new AgeController({
  db: {
    Age: db.Age,
  },
  services: {},
});

const educationController = new EducationController({
  db: {
    Education: db.Education,
  },
  services: {},
});

const ethnicityController = new EthnicityController({
  db: {
    Ethnicity: db.Ethnicity,
  },
  services: {},
});

const incomeController = new IncomeController({
  db: {
    Income: db.Income,
  },
  services: {},
});

module.exports = {
  stateController,
  genderController,
  ageController,
  educationController,
  ethnicityController,
  incomeController,
};
