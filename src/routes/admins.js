var express = require('express');
var router = express.Router();
const admin_controller = require('../controllers/admin-controller')

router.post('/', admin_controller.create_post);
router.get('/', admin_controller.get_all);
router.get('/:id_admin', admin_controller.get_one);
router.delete('/:id_admin',admin_controller.delete_one);

module.exports = router;