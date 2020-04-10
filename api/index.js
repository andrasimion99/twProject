const http = require("http");

const { router } = require("./router");
const { routes } = require("./router");
const { mongoose } = require("./router");

process.on("uncaughtException", function (err) {
  console.log("uncaughtException");
  console.error(err.stack);
  console.log(err);
});

const server = http.createServer(async (req, res) => {
  await mongoose();
  console.log("Connected to database successfully");
  await router(req, res, routes);
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
