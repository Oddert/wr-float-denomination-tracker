"use strict";
var knex = require('knex');
var config = require('../knexfile');
var environment = process.env.NODE_ENV || 'development';
var selectedConfig = config[environment];
var Knex = knex(selectedConfig);
module.exports = Knex;
//# sourceMappingURL=knex.js.map