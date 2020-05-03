const jwt = require('jsonwebtoken');

const knex = require('../helpers/knex');
const modelCURD = require('../helpers/model-curd');
const config = require('../configs');
const common = require('../helpers/common');
const schema = config.database.schema;

const tableName = `${schema}.user`;
const selectableProps = [
  'email',
  'kvp',
  'created_at',
  'modified_at'
];

const userModel = modelCURD({
  knex,
  tableName,
  selectableProps
});

async function getUserWithPassword(email) {
  return knex.select().from(tableName).where({ email: email }).first();
}

async function findByCredentials(email, password) {
  const user = await getUserWithPassword(email);
  if (!user) {
    return false;
  }

  const isPasswordMatch = await common.checkPassword(password, user.password);
  if (!isPasswordMatch) {
    return false;
  }

  return user;
}

async function generateAuthToken(user) {
  const token = await jwt.sign({ user_id: user.user_id }, config.jwtSecret);
  await knex.insert({
    token,
    user_id: user.user_id
  }).into(`${schema}.user_token`);
  return token;
}

async function findByToken(userId, token) {
  return knex.select()
    .join(`${schema}.user_token`, 'user.user_id', 'user_token.user_id')
    .from(`${schema}.user`)
    .where('user.user_id', userId)
    .where('user_token.token', token)
    .first();
}

async function deleteToken(userId, token){
  return knex.del()
    .table(`${schema}.user_token`)
    .where('user_id', userId)
    .where('token', token);
}

module.exports = {
  ...userModel,
  findByCredentials,
  generateAuthToken,
  findByToken,
  deleteToken
}