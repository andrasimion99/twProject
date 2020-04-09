const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
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
});

module.exports = stateSchema;
