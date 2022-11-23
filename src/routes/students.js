var express = require('express');
var router = express.Router();
const student_controller = require('../controllers/student-controller')

router.post('/', student_controller.create_post);
router.get('/', student_controller.get_all);
router.get('/:id_student', student_controller.get_one);
router.delete('/:id_student', student_controller.delete_one);

module.exports = router;