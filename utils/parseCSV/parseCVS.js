const csv = require("csvtojson");
const fs = require("fs");
const async = require("async");
path = "C:/Users/Andra/Downloads/csv";

fs.readdir(path, function (err, items) {
  if (err) {
    console.log(err);
    process.exit(-1);
  }
  async.eachLimit(
    items,
    1,
    function (file, next) {
      csv({
        colParser: {
          YearStart: "omit",
          YearEnd: "omit",
          Class: "omit",
          Question: "omit",
          Response: "omit",
          Data_Value_Unit: "omit",
          DataValueTypeId: "omit",
          Data_Value_Type: "omit",
          Data_Value_Footnote_Symbol: "omit",
          Data_Value_Footnote: "omit",
          Low_Confidence_Limit: "omit",
          High_Confidence_Limit: "omit",
          GeoLocation_Lat: "omit",
          GeoLocation_Long: "omit",
          ClassId: "omit",
          TopicId: "omit",
          QuestionId: "omit",
          ResponseId: "omit",
          StratficationCategory1: "omit",
          StratificationCategoryId1: "omit",
          StratificationCategory2: "omit",
          StratificationCategoryId2: "omit",
          Stratification2: "omit",
          StratificationId2: "omit",
          StratificationCategory3: "omit",
          StratificationCategoryId3: "omit",
          Stratification3: "omit",
          StratificationId3: "omit",
          FootnoteSymbol: "omit",
          FootnoteText: "omit",
          URL: "omit",
          FootnoteHeading: "omit",
        },
        checkType: true,
      })
        .fromFile(path + "/" + file)
        .then((jsonObj) => {
          var data = JSON.stringify(jsonObj, null, 2);
          const fileName = file.split(".");
          fs.writeFileSync(path + "/" + fileName[0] + ".json", data);
          next();
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
