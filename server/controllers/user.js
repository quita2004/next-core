const { v4: uuidv4 } = require('uuid');
const validator = require('validator');

const models = require('../models');
const { hashPassword } = require('../helpers/common');
const messages = require('../helpers/messages');

async function createUser(req, res) {
  const { email, password, fullName } = req.body;
  if (!email || !password) {
    messages.BabRequest(res, { message: `Email or password is empty` });
    return;
  }
  if (!validator.isEmail(email)) {
    messages.BabRequest(res, { message: 'Email is invalid' });
    return;
  }
  const userExist = await models.User.findAll({ email });
  if (userExist.length > 0) {
    messages.BabRequest(res, { message: 'Email is already exist' });
    return;
  }

  const passwordHash = await hashPassword(password);
  const user = {
    email,
    password: passwordHash,
    user_id: uuidv4(),
    kvp: {
      fullName
    }
  };

  const data = await models.User.create(user);

  messages.Success(res, { data });
}

async function getInfo(req, res) {
  const { userId } = req;

  const user = await models.User.findOne({ user_id: userId });
  messages.Success(res, { data: user });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await models.User.findByCredentials(email, password);
  if (!user) {
    messages.BabRequest(res, { message: 'Email or password not valid' })
  }

  const token = await models.User.generateAuthToken(user);

  messages.Success(res, { data: { user, token } })
}

async function logout(req, res) {
  const { token, userId } = req;
  if (token && userId) {
    await models.User.deleteToken(userId, token);
  }

  messages.Success(res, {});
}

module.exports = {
  createUser,
  getInfo,
  login,
  logout
}