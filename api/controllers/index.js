const db = require("../models/index");

const StateController = require("./StatesController");
const GenderController = require("./GenderController");

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

module.exports = {
  stateController,
  genderController,
};
