const jwt = require('jsonwebtoken');

const config = require('../../configs');
const messages = require('../../helpers/messages');
const models = require('../../models');

async function requireAuthentication(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  const data = jwt.verify(token, config.jwtSecret);
  if (!token) {
    return messages.Unauthorized(res, { message: "Missing auth token in header" });
  }

  const user = await models.User.findByToken(data.user_id, token);
  if (!user) {
    return messages.Unauthorized(res, { message: 'Unable to find user for token' });
  }

  req.user = user;
  req.userId = user.user_id;
  req.token = token;
  next();
}

module.exports = requireAuthentication;