const helpers = require("./../common/helpers");

const CREATED = 201;
const NO_CONTENT = 204;

class AgeController {
  constructor({ db, services }) {
    this.db = db;
    this.services = services;
  }

  async getAgeData(req, res, param) {
    try {
      var propertyParams = {};
      if (param.country) {
        propertyParams["LocationDesc"] = param.country;
      }
      if (param.year) {
        propertyParams["Description"] = param.year;
      }
      if (param.age) {
        propertyParams["StratificationId1"] = param.age;
      }
      const ageData = await this.db.Age.find(propertyParams);
      return helpers.success(res, ageData);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async createAgeData(req, res, param, body) {
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
    const ageData = {
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
      const age = new this.db.Age(ageData);
      await age.save();
      return helpers.success(res, ageData, CREATED);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async updateAgeData(req, res, param, body) {
    try {
      if (Object.keys(param).length == 0 || !param.id) {
        return helpers.error(
          res,
          "The id of the object you want to modify is not valid"
        );
      } else {
        const age = await this.db.Age.updateOne({ _id: param.id }, body);
        return helpers.success(res, age, NO_CONTENT);
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async deleteAgeData(req, res, param) {
    try {
      var propertyParams = {};
      if (param.country) {
        propertyParams["LocationDesc"] = param.country;
      }
      if (param.year) {
        propertyParams["Description"] = param.year;
      }
      if (param.age) {
        propertyParams["StratificationId1"] = param.age;
      }
      const ageData = await this.db.Age.deleteMany(propertyParams);
      return helpers.success(res, ageData, NO_CONTENT);
    } catch (error) {
      return helpers.error(res, error);
    }
  }
}

module.exports = AgeController;
