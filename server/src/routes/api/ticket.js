const posts = require('../../controllers/Posts')
const express = require('express');
var router = express.Router();



router
  .get('/', posts.all)
  .post('/', posts.add)
  .put('/:id', posts.edit)
  .delete('/:id', posts.delete)
  .get('/:id', posts.get)


module.exports = router;