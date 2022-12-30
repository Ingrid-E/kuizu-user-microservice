const { Teacher } = require('../models/index')

module.exports = {
    create_post: async function (req, res) {
        try {
            const { id_user } = req.body
            const teacher = await Teacher.create({
                id_user: id_user
            })
            return res.status(201).json({ success: true, data: {title: "Teacher created!", id_teacher: teacher.id_teacher}});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }
    },
    get_all: async function (req, res) {
        try {
            const teachers = await Teacher.findAll()
            if(teachers.length === 0){
                return res.status(404).json({success: false, data: {title: "Teachers not found"}})
            }
            return res.status(200).json({ success: true, data: {count: teachers.length, teachers}});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }
    },
    get_one: async function (req, res) {
        const { id_teacher } = req.params;
        try {
            const teacher = await Teacher.findByPk(id_teacher);
            if(teacher === null){
                return res.status(404).json({success: false, data: {title: "Teacher not found"}})
            }
            return res.status(200).json({ success: true, data: {teacher}});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }

    },
    delete_one: async function (req, res) {
        const { id_teacher } = req.params
        try {
            const teacher = await Teacher.destroy({
                where: {
                    id_teacher: id_teacher
                }
            })
            if(teacher === 0){
                return res.status(404).json({success: false, data: {title: "Teacher not found"}})
            }
            return res.status(200).json({ success: true, data: {title: "Teacher deleted"}, teacher});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }
    },
    put_one: async function (req, res) {
        const { id_teacher } = req.params;
        try {
            const { id_user } = req.body;
            const teacher = await Teacher.update({
                id_user: id_user
            }, {
                where: {
                    id_teacher: id_teacher
                }
            });
            if(teacher[0] === 0){
                return res.status(404).json({success: false, data: {title: "Teacher not found"}})
            }
            return res.status(200).json({ success: true, data: {title: "Teacher updated"}});
        } catch (error) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }
    }
}





