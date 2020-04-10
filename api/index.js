const http = require("http");

const { router } = require("./router");
const { routes } = require("./router");
const { mongoose } = require("./router");
const { PORT } = require("./config");

process.on("uncaughtException", function (err) {
  console.log("uncaughtException");
  console.error(err.stack);
  console.log(err);
});

const server = http.createServer(async (req, res) => {
  await router(req, res, routes);
});

server.listen(PORT, async () => {
  await mongoose();
  console.log("Connected to database successfully");
  console.log("Server is listening on port " + PORT);
});
