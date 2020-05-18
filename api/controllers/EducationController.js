const helpers = require("./../common/helpers");

const CREATED = 201;
const NO_CONTENT = 204;

class EducationController {
  constructor({ db, services }) {
    this.db = db;
    this.services = services;
  }

  async getEducationData(req, res, param) {
    try {
      var propertyParams = {};
      if (param.country) {
        propertyParams["LocationDesc"] = param.country;
      }
      if (param.year) {
        propertyParams["Description"] = param.year;
      }
      if (param.education) {
        propertyParams["StratificationId1"] = param.education;
      }
      const educationData = await this.db.Education.find(propertyParams);
      return helpers.success(res, educationData);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async createEducationData(req, res, param, body) {
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
    const educationData = {
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
      const education = new this.db.Education(educationData);
      await education.save();
      return helpers.success(res, educationData, CREATED);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async updateEducationData(req, res, param, body) {
    try {
      if (Object.keys(param).length == 0 || !param.id) {
        return helpers.error(
          res,
          "The id of the object you want to modify is not valid"
        );
      } else {
        const education = await this.db.Education.updateOne(
          { _id: param.id },
          body
        );
        return helpers.success(res, education, NO_CONTENT);
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async deleteEducationData(req, res, param) {
    try {
      var propertyParams = {};
      if (param.country) {
        propertyParams["LocationDesc"] = param.country;
      }
      if (param.year) {
        propertyParams["Description"] = param.year;
      }
      if (param.education) {
        propertyParams["StratificationId1"] = param.education;
      }
      const educationData = await this.db.Education.deleteMany(propertyParams);
      return helpers.success(res, educationData, NO_CONTENT);
    } catch (error) {
      return helpers.error(res, error);
    }
  }
}

module.exports = EducationController;
