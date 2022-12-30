const {Student} = require('../models/index')

module.exports = {
    create_post: async function (req, res) {
        try {
            const { id_user } = req.body
            const student = await Student.create({
                id_user: id_user
            })
            return res.status(201).json({ success: true, data: {title: "Student created!", id_student: student.id_student}});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});

        }
    },
    get_all: async function (req,res){
        try{
            const student = await Student.findAll()
            if(student.length === 0){
                return res.status(404).json({success: false, data: {title: "Students not found"}})
            }
            return res.status(200).json({ success: true, data: {count: student.length, student}});
        }catch (err){
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }
    },
    get_one: async function (req,res){
        try{
            const {id_student} = req.params;
            const student = await Student.findByPk(id_student);
            if(student === null){
                return res.status(404).json({success: false, data: {title: "Student not found"}})
            }
            return res.status(200).json({ success: true, data: {student}});
        }catch (err){
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }

    },
    delete_one: async function (req, res) {
        try {
            const { id_student } = req.params
            const student = await Student.destroy({
                where: {
                    id_student: id_student
                }
            })
            if(student === 0){
                return res.status(404).json({success: false, data: {title: "Student not found"}})
            }
            return res.status(200).json({ success: true, data: {title: "Student deleted"}, student});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }
    },
    put_one: async function (req, res) {
        try {
            const { id_student } = req.params;
            const { id_user } = req.body;
            const student = await Student.update({
                id_user: id_user
            }, {
                where: {
                    id_student: id_student
                }
            });
            if(student[0] === 0){
                return res.status(404).json({success: false, data: {title: "Student not found"}})
            }
            return res.status(200).json({ success: true, data: {title: "Student updated"}});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }
    }
}