const helpers = require("./../common/helpers");

const CREATED = 201;
const NO_CONTENT = 204;

class GenderController {
  constructor({ db, services }) {
    this.db = db;
    this.services = services;
  }

  async getGenderData(req, res, param) {
    try {
      var propertyParams = {};
      if (param.country) {
        propertyParams["LocationDesc"] = param.country;
      }
      if (param.year) {
        propertyParams["Description"] = param.year;
      }
      if (param.gender) {
        propertyParams["StratificationId1"] = param.gender;
      }
      const genderData = await this.db.Gender.find(propertyParams);
      return helpers.success(res, genderData);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async createGenderData(req, res, param, body) {
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
    const genderData = {
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
      const gender = new this.db.Gender(genderData);
      await gender.save();
      return helpers.success(res, genderData, CREATED);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async updateGenderData(req, res, param, body) {
    try {
      if (Object.keys(param).length == 0 || !param.id) {
        return helpers.error(
          res,
          "The id of the object you want to modify is not valid"
        );
      } else {
        const gender = await this.db.Gender.updateOne({ _id: param.id }, body);
        return helpers.success(res, gender, NO_CONTENT);
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async deleteGenderData(req, res, param) {
    try {
      var propertyParams = {};
      if (param.country) {
        propertyParams["LocationDesc"] = param.country;
      }
      if (param.year) {
        propertyParams["Description"] = param.year;
      }
      if (param.gender) {
        propertyParams["StratificationId1"] = param.gender;
      }
      const genderData = await this.db.Gender.deleteMany(propertyParams);
      return helpers.success(res, genderData, NO_CONTENT);
    } catch (error) {
      return helpers.error(res, error);
    }
  }
}

module.exports = GenderController;
