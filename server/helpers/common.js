const bcrypt = require('bcryptjs');
const _ = require("lodash");

async function hashPassword(password) {
  return bcrypt.hash(password, 8);
}

async function checkPassword(password, hash){
  return bcrypt.compare(password, hash);
}

const convertObjectToCamelCase = oldObject => {
  if (!oldObject) return oldObject;
  const newObject = {};
  for (const [key, value] of Object.entries(oldObject)) {
    const newKey = _.camelCase(key);
    newObject[newKey] = value;

    if (typeof value === "object") {
      const newValue = convertObjectToCamelCase(value);
      newObject[newKey] = newValue;
    }
  }

  if (Object.keys(newObject).length === 0) return oldObject;
  return newObject;
};

const convertObjectToSnakeCase = oldObject => {
  if (!oldObject) return oldObject;
  const newObject = {};
  for (const [key, value] of Object.entries(oldObject)) {
    const newKey = _.snakeCase(key);
    newObject[newKey] = value;

    if (typeof value === "object") {
      const newValue = convertObjectToSnakeCase(value);
      newObject[newKey] = newValue;
    }
  }

  if (Object.keys(newObject).length === 0) return oldObject;
  return newObject;
};

module.exports = {
  hashPassword,
  checkPassword,
  convertObjectToCamelCase,
  convertObjectToSnakeCase
}