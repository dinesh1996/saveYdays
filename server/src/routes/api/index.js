const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/posts', require('./post'));
router.use('/tickets', require('./ticket'));



module.exports = router;