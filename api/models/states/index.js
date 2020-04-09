const mongoose = require('mongoose');
const stateSchema = require('./schema');

const statics = require('./statics');
const methods = require('./methods');

Object.assign(stateSchema.methods, methods);
Object.assign(stateSchema.statics, statics);

const State = mongoose.model('State', stateSchema);

module.exports = State;
