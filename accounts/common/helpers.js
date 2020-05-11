module.exports.error = (
  res,
  error = "An unknown error occurred",
  statusCode = 400
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

module.exports.success = (res, data = null, statusCode = 200) => {
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
  return res;
};
