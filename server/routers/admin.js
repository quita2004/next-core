const express = require('express');
const router = express.Router();

const controllers = require('../controllers');
const requireAuth = require('./middleware/auth');

const userRouter = express.Router();

router.get('/info', requireAuth, controllers.User.getInfo);

// url: /api/admin/user/:userId
userRouter.get('/');

// url: /api/admin/user
userRouter.post('/', controllers.User.createUser);

// url: /api/admin/user/login
userRouter.post('/login', controllers.User.login);

// url: /api/admin/user/login
userRouter.post('/logout', requireAuth, controllers.User.logout);

router.use('/user', userRouter);

module.exports = router;