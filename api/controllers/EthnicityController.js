const helpers = require("./../common/helpers");

const CREATED = 201;
const NO_CONTENT = 204;

class EthnicityController {
  constructor({ db, services }) {
    this.db = db;
    this.services = services;
  }

  async getEthnicityData(req, res, param) {
    try {
      var propertyParams = {};
      if (param.country) {
        propertyParams["LocationDesc"] = param.country;
      }
      if (param.year) {
        propertyParams["Description"] = param.year;
      }
      if (param.ethnicity) {
        propertyParams["StratificationId1"] = param.ethnicity;
      }
      const ethnicityData = await this.db.Ethnicity.find(propertyParams);
      return helpers.success(res, ethnicityData);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async createEthnicityData(req, res, param, body) {
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
    const ethnicityData = {
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
      const ethnicity = new this.db.Ethnicity(ethnicityData);
      await ethnicity.save();
      return helpers.success(res, ethnicityData, CREATED);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async updateEthnicityData(req, res, param, body) {
    try {
      if (Object.keys(param).length == 0 || !param.id) {
        return helpers.error(
          res,
          "The id of the object you want to modify is not valid"
        );
      } else {
        const ethnicity = await this.db.Ethnicity.updateOne({ _id: param.id }, body);
        return helpers.success(res, ethnicity, NO_CONTENT);
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async deleteEthnicityData(req, res, param) {
    try {
      var propertyParams = {};
      if (param.country) {
        propertyParams["LocationDesc"] = param.country;
      }
      if (param.year) {
        propertyParams["Description"] = param.year;
      }
      if (param.ethnicity) {
        propertyParams["StratificationId1"] = param.ethnicity;
      }
      const ethnicityData = await this.db.Ethnicity.deleteMany(propertyParams);
      return helpers.success(res, ethnicityData, NO_CONTENT);
    } catch (error) {
      return helpers.error(res, error);
    }
  }
}

module.exports = EthnicityController;
