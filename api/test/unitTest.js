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
            "Statusul nu este success for gender in Alaska 2016"
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

const mainTest = async function () {
  await testGetGender();
  await testGetStates();
};

mainTest();
