const mongoose = require("mongoose");
const async = require("async");
var Schema = mongoose.Schema;
mongoose.connect(
  "mongodb+srv://andra-raluca:Bisl2k5pczRc4kPK@ip-project-yau3a.mongodb.net/obesity_usa?authSource=admin&replicaSet=ip-project-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("connected");
      var Age = mongoose.model(
        "income",
        new Schema({
          ID: {
            type: String,
            required: true,
          },
          Description: {
            type: String,
            required: true,
          },
          LocationAbbr: {
            type: String,
            required: true,
          },
          LocationDesc: {
            type: String,
            required: true,
          },
          DataSource: {
            type: String,
            required: true,
          },
          Topic: {
            type: String,
            required: true,
          },
          Data_Value: {
            type: String,
            required: true,
          },
          Sample_Size: {
            type: String,
            required: true,
          },
          Stratification1: {
            type: String,
            required: true,
          },
          StratificationId1: {
            type: String,
            required: true,
          },
          LocationDisplayOrder: {
            type: String,
            required: true,
          },
        }),
        "income"
      );
      Age.find({ Stratification1: "$15" }, function (err, collection) {
        if (err) {
          console.log(err);
        } else {
          console.log(collection.length);

          async.eachLimit(
            collection,
            1,
            function (item, next) {
              Age.updateOne(
                {
                  _id: item._id,
                },
                {
                  Stratification1: "$15000 - $24999",
                  StratificationId1: "$15000 - $24999",
                },
                function (err1) {
                  if (err1) {
                    console.log(err1);
                  }
                  next();
                }
              );
            },
            function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log("done");
              }
            }
          );

          // async.eachLimit(
          //   collection,
          //   1,
          //   function (item, next) {
          //     Age.updateOne(
          //       {
          //         _id: item._id,
          //       },
          //       {
          //         LocationDisplayOrder: item.StratificationId1,
          //         StratificationId1: item.Stratification1,
          //       },
          //       function (err1) {
          //         if (err1) {
          //           console.log(err1);
          //         }
          //         next();
          //       }
          //     );
          //   },
          //   function (err) {
          //     if (err) {
          //       console.log(err);
          //     } else {
          //       console.log("done");
          //     }
          //   }
          // );
        }
      });
    }
  }
);
