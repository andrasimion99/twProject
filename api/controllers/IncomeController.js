const helpers = require("./../common/helpers");

const CREATED = 201;
const NO_CONTENT = 204;

class IncomeController {
  constructor({ db, services }) {
    this.db = db;
    this.services = services;
  }

  async getIncomeData(req, res, param) {
    try {
      var propertyParams = {};
      if (param.country) {
        propertyParams["LocationDesc"] = param.country;
      }
      if (param.year) {
        propertyParams["Description"] = param.year;
      }
      if (param.income) {
        propertyParams["StratificationId1"] = param.income;
      }
      const incomeData = await this.db.Income.find(propertyParams);
      return helpers.success(res, incomeData);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async createIncomeData(req, res, param, body) {
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
    const incomeData = {
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
      const income = new this.db.Income(incomeData);
      await income.save();
      return helpers.success(res, incomeData, CREATED);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async updateIncomeData(req, res, param, body) {
    try {
      if (Object.keys(param).length == 0 || !param.id) {
        return helpers.error(
          res,
          "The id of the object you want to modify is not valid"
        );
      } else {
        const income = await this.db.Income.updateOne({ _id: param.id }, body);
        return helpers.success(res, income, NO_CONTENT);
      }
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async deleteIncomeData(req, res, param) {
    try {
      var propertyParams = {};
      if (param.country) {
        propertyParams["LocationDesc"] = param.country;
      }
      if (param.year) {
        propertyParams["Description"] = param.year;
      }
      if (param.income) {
        propertyParams["StratificationId1"] = param.income;
      }
      const incomeData = await this.db.Income.deleteMany(propertyParams);
      return helpers.success(res, incomeData, NO_CONTENT);
    } catch (error) {
      return helpers.error(res, error);
    }
  }
}

module.exports = IncomeController;
