const OK = 200;
const BAD_REQUEST = 400;

module.exports.error = (
  res,
  error = "An unknown error occurred",
  statusCode = BAD_REQUEST
) => {
  addHeaders(res);
  res.statusCode = statusCode;
  res.end(
    JSON.stringify(
      {
        status: "fail",
        error: error.toString(),
      },
      null,
      3
    )
  );
};

module.exports.success = (res, data = null, statusCode = OK) => {
  addHeaders(res);
  res.statusCode = statusCode;
  res.end(
    JSON.stringify(
      {
        status: "success",
        data,
      },
      null,
      3
    )
  );
};

const addHeaders = (res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PATCH, DELETE");
  return res;
};
