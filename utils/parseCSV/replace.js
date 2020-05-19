var fs = require("fs");
const async = require("async");
path =
  "E:/facultate/Anul II/Anul II/Semestrul II/twProject/database/data/2012-csv";

fs.readdir(path, function (err, items) {
  if (err) {
    console.log(err);
    process.exit(-1);
  }
  async.eachLimit(
    items,
    1,
    function (file, next) {
      fs.readFile(path + "/" + file, "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(/"/g, "");

        fs.writeFile(path + "/" + file, result, "utf8", function (err) {
          if (err) return console.log(err);
          next();
        });
      });
      
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("done successfully");
      }
    }
  );
});
