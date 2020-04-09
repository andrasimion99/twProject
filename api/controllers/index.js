const db = require("../models/index");

const StateController = require("./StatesController");

const stateController = new StateController({
  db: {
    State: db.State,
  },
  services: {},
});

module.exports = {
  stateController,
};
