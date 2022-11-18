var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/user-controller')

router.post('/', user_controller.create_post);
module.exports = router;
