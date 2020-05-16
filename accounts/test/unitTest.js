const assert = require("assert");
const http = require("http");
const querystring = require("querystring");

const testGetUsers = async function () {
  http
    .get("http://localhost:3002/api/users", (resp) => {
      let data = "";

      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        data = JSON.parse(data);
        assert.strictEqual(data.status, "success");
        assert.ok(data.data.length >= 0);
      });
    })
    .on("error", (err) => {
      console.log(err);
    });
};

const testGetUserWithWrongToken = async function () {
  http
    .get("http://localhost:3002/api/users?token=invalid", (resp) => {
      let data = "";

      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        data = JSON.parse(data);
        assert.strictEqual(data.status, "fail");
        assert.strictEqual(data.error, "The token is not valid.");
      });
    })
    .on("error", (err) => {
      console.log(err);
    });
};

const testPostRegister = async function () {
  const parameters = {
    email: "andrasimi@gmail.com",
    password: "andra",
  };

  const options = {
    host: "localhost",
    port: "3002",
    path: "/api/users/register",
    method: "POST",
  };
  const request = http.request(options, (resp) => {
    let data = "";

    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () => {
      data = JSON.parse(data);
      assert.strictEqual(data.status, "success");
      assert.strictEqual(data.data.email, parameters.email);
      assert.strictEqual(data.data.userType, "user");
    });
  });

  request.on("error", (err) => {
    console.log(err);
  });

  request.write(JSON.stringify(parameters));
  request.end();
};

const testPostRegisterWithInvalidEmail = async function () {
  const parameters = {
    email: "andrasimion99gmail.com",
    password: "andra",
  };

  const options = {
    host: "localhost",
    port: "3002",
    path: "/api/users/register",
    method: "POST",
  };
  const request = http.request(options, (resp) => {
    let data = "";

    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () => {
      data = JSON.parse(data);
      assert.strictEqual(data.status, "fail");
      assert.strictEqual(data.error, "The email is not valid.");
    });
  });

  request.on("error", (err) => {
    console.log(err);
  });

  request.write(JSON.stringify(parameters));
  request.end();
};

const mainTest = async function () {
  await testGetUsers();
  await testGetUserWithWrongToken();
  await testPostRegister();
  await testPostRegisterWithInvalidEmail();
};

mainTest();
