var express = require('express');
var router = express.Router();
const teacher_controller = require('../controllers/teacher-controller')

router.post('/', teacher_controller.create_post);
router.get('/', teacher_controller.get_all);
router.get('/:id_teacher', teacher_controller.get_one);
router.delete('/:id_teacher', teacher_controller.delete_one);

module.exports = router;