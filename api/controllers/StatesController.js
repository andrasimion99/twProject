const helpers = require("./../common/helpers");

const CREATED = 201;
const NO_CONTENT = 204;

class StateController {
  constructor({ db, services }) {
    this.db = db;
    this.services = services;
  }

  async getStatesData(req, res, param) {
    try {
      if (Object.keys(param).length == 0) {
        const statesData = await this.db.State.find({});
        return helpers.success(res, statesData);
      } else if (param.country && !param.year) {
        const statesData = await this.db.State.find({
          LocationDesc: param.country,
        });
        return helpers.success(res, statesData);
      } else if (param.year && !param.country) {
        const statesData = await this.db.State.find({
          Description: param.year,
        });
        return helpers.success(res, statesData);
      } else {
        const statesData = await this.db.State.find({
          LocationDesc: param.country,
          Description: param.year,
        });
        return helpers.success(res, statesData);
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async createStateData(req, res, param, body) {
    const {
      ID,
      Description,
      LocationAbbr,
      LocationDesc,
      DataSource,
      Topic,
      Data_Value,
      Sample_Size,
      Stratification1,
      StratificationId1,
      LocationDisplayOrder,
    } = body;
    const stateData = {
      ID,
      Description,
      LocationAbbr,
      LocationDesc,
      DataSource,
      Topic,
      Data_Value,
      Sample_Size,
      Stratification1,
      StratificationId1,
      LocationDisplayOrder,
    };
    try {
      const state = new this.db.State(stateData);
      await state.save();
      return helpers.success(res, stateData, CREATED);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async updateStateData(req, res, param, body) {
    try {
      if (Object.keys(param).length == 0 || !param.id) {
        return helpers.error(
          res,
          "The id of the object you want to modify is not valid"
        );
      } else {
        const state = await this.db.State.updateOne({ _id: param.id }, body);
        return helpers.success(res, state, NO_CONTENT);
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async deleteStatesData(req, res, param) {
    try {
      if (Object.keys(param).length == 0) {
        const statesData = await this.db.State.deleteMany({});
        return helpers.success(res, statesData, NO_CONTENT);
      } else if (param.country && !param.year) {
        const statesData = await this.db.State.deleteMany({
          LocationDesc: param.country,
        });
        return helpers.success(res, statesData, NO_CONTENT);
      } else if (param.year && !param.country) {
        const statesData = await this.db.State.deleteMany({
          Description: param.year,
        });
        return helpers.success(res, statesData, NO_CONTENT);
      } else {
        const statesData = await this.db.State.deleteMany({
          LocationDesc: param.country,
          Description: param.year,
        });
        return helpers.success(res, statesData, NO_CONTENT);
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }
}

module.exports = StateController;
