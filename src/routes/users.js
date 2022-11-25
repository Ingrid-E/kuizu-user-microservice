var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/user-controller')

router.post('/', user_controller.create_post);
router.get('/', user_controller.get_all);
router.get('/:id_user', user_controller.get_one);
router.delete('/:id_user', user_controller.delete_one);

module.exports = router;
