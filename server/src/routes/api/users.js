const router = require('express').Router();
const verifyToken = require('../verifyToken');
const Users = require('../../controllers/Users')

router
  .get('/current', verifyToken, Users.current)
  .post('/register', Users.register)
  .post('/login', Users.login)
  .post('/active/:activeToken', Users.active)
  .post('/logout/', verifyToken, Users.logout)


module.exports = router;