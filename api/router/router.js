const helpers = require("../common/helpers");
const url = require("url");

module.exports = async (req, res, routes) => {
  const path = url.parse(req.url, true).pathname;
  const found = routes.find((route) => {
    return route.path == path && route.method == req.method;
  });
  if (found) {
    const param = url.parse(req.url, true).query;
    let body = null;
    if (req.method === "POST" || req.method === "PATCH") {
      body = await getPostData(req);
    }
    return found.handler(req, res, param, body);
  } else {
    return helpers.error(res, "Endpoint not found", 404);
  }
};

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (e) {
      reject(e);
    }
  });
}
