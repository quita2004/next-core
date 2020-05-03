const config = require('../configs');
const knex = require('knex')(config.database);

module.exports = knex;