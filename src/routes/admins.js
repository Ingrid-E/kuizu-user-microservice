var express = require('express');
var router = express.Router();
const admin_controller = require('../controllers/admin-controller')

router.post('/add/:id_user', admin_controller.create_post);
router.get('/:id_user1', admin_controller.get_one);

module.exports = router;