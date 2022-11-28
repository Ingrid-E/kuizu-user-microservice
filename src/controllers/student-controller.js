const {Student} = require('../models/index')

module.exports = {
    create_post: async function (req, res) {
        try {
            const { id_user } = req.body
            const student = await Student.create({
                id_user: id_user
            })
            return res.status(201).json({ success: true, student: JSON.stringify(student, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to create a new student" });

        }
    },
    get_all: async function (req,res){
        try{
            const student = await Student.findAll()
            return res.status(201).json({ success: true, student: JSON.stringify(student, null, 2) });
        }catch (err){
            return res.status(500).json({ success: false, error: err, message: "It was not possible to get all students" });
        }
    },
    get_one: async function (req,res){
        try{
            const {id_student} = req.params;
            const student = await Student.findByPk(id_student);
              return res.status(201).json({ success: true, student: JSON.stringify(student, null, 2) });
        }catch (err){
            return res.status(500).json({ success: false, error: err, message: "It was not possible to get the student" });
        }

    },
    delete_one: async function (req, res) {
        try {
            const { id_student } = req.params
            const destroy = await Student.destroy({
                where: {
                    id_student: id_student
                }
            })
            return res.status(201).json({ success: true, student: JSON.stringify(destroy, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to delete the student" });
        }
    },
    put_one: async function (req, res) {
        try {
            const { id_student } = req.params;
            const { id_user } = req.body;
            const update = await Admin.update({
                id_user: id_user
            }, {
                where: {
                    id_student: id_student
                }
            });
            return res.status(201).json({ success: true, teacher: JSON.stringify(update, null, 2) });
        } catch (error) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to update the student" });
        }
    }
}