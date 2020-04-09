const helpers = require("./../common/helpers");

class StateController {
  constructor({ db, services }) {
    this.db = db;
    this.services = services;
  }

  async getAllStatesData(req, res) {
    try {
      console.log(this.db.State);
      const statesData = "RASPUNS"/*await this.db.State.find({})*/;
      return helpers.success(res, statesData);
    } catch (error) {
      return helpers.error(res, error);
    }
  }
}

module.exports = StateController;
