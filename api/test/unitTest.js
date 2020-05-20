const assert = require("assert");
const http = require("http");

const testGetGender = async function () {
  http
    .get(
      "http://localhost:3001/api/gender?country=Alaska&year=2016",
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          data = JSON.parse(data);
          assert.strictEqual(
            data.status,
            "success",
            "Statusul is not success for gender in Alaska 2016"
          );
          assert.strictEqual(
            data.data.length,
            2,
            "Data array is not 2 for gender in Alaska 2016"
          );
          assert.strictEqual(
            data.data[0].LocationDesc,
            data.data[1].LocationDesc
          );
          assert.strictEqual(
            data.data[0].LocationDesc,
            "Alaska",
            "Country for returned data is wrong."
          );
          assert.strictEqual(
            data.data[0].Description,
            data.data[1].Description
          );
          assert.strictEqual(
            data.data[0].Description,
            "2016",
            "Year for returned data is wrong."
          );
        });
      }
    )
    .on("error", (err) => {
      console.log(err);
    });
};

const testGetStates = async function () {
  http
    .get("http://localhost:3001/api/states?country=wrongCountry", (resp) => {
      let data = "";

      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        data = JSON.parse(data);
        assert.strictEqual(data.status, "success");
        assert.strictEqual(
          data.data.length,
          0,
          "Data array is not 0 for wrong country"
        );
      });
    })
    .on("error", (err) => {
      console.log(err);
    });
};

const testGetAge = async function () {
  http
    .get(
      "http://localhost:3001/api/age?country=Texas&year=2017&age=18%20-%2024",
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          data = JSON.parse(data);
          assert.strictEqual(
            data.status,
            "success",
            "Statusul is not success for age 18-24 in Texas 2017"
          );
          assert.strictEqual(
            data.data.length,
            1,
            "Data array is not 1 for age 18-24 in Texas 2017"
          );
          assert.strictEqual(
            data.data[0].LocationDesc,
            "Texas",
            "Country for returned data is wrong."
          );
          assert.strictEqual(
            data.data[0].Description,
            "2017",
            "Year for returned data is wrong."
          );
          assert.strictEqual(
            data.data[0].Stratification1,
            "18 - 24",
            "Category for returned data is wrong"
          );
        });
      }
    )
    .on("error", (err) => {
      console.log(err);
    });
};

const testGetIncome = async function () {
  http
    .get(
      "http://localhost:3001/api/income?country=California&year=2011",
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          data = JSON.parse(data);
          assert.strictEqual(
            data.status,
            "success",
            "Statusul is not success for income in California 2011"
          );
          assert.strictEqual(
            data.data.length,
            6,
            "Data array is not 6 pentru income in California 2011"
          );
          assert.strictEqual(
            data.data[0].LocationDesc,
            "California",
            "Country for returned data is wrong."
          );
          assert.strictEqual(
            data.data[0].Description,
            "2011",
            "Year for returned data is wrong."
          );
        });
      }
    )
    .on("error", (err) => {
      console.log(err);
    });
};

const mainTest = async function () {
  await testGetGender();
  await testGetStates();
  await testGetAge();
  await testGetIncome();
};

mainTest();
