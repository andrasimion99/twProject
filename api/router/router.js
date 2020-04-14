const helpers = require("../common/helpers");
const url = require("url");
var http = require("http");
var fs = require("fs");
var path = require("path");

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
    serveStaticPages(req, res);
    // return helpers.error(res, "Endpoint not found", 404);
  }
};

function serveStaticPages(request, response) {
  console.log("request ", request.url);

  var filePath = path.join(
    __dirname,
    "..",
    "pages",
    request.url === "/" ? "index.html" : request.url
  );
  if (filePath == "./") {
    filePath = "./../pages/index.html";
  }

  var extname = String(path.extname(filePath)).toLowerCase();
  var mimeTypes = {
    ".json": "application/json",
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".eot": "text/fonts",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
  };

  var contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == "ENOENT") {
        fs.readFile("./404.html", function (error, content) {
          response.writeHead(404, { "Content-Type": "text/html" });
          response.end(content, "utf-8");
        });
      } else {
        response.writeHead(500);
        response.end(
          "Sorry, check with the site admin for error: " + error.code + " ..\n"
        );
      }
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });
}

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
