const {Student} = require('../models/index')

module.exports = {
    create_post: async function (req, res) {
        try {
            const { id_user } = req.body
            const student = await Student.create({
                id_user: id_user
            })
            return res.status(200).json({ success: true, student: JSON.stringify(student, null, 2) });
        } catch (err) {
            return res.status(404).json({ success: false, error: err });

        }
    },
    get_all: async function (req,res){
        try{
            const student = await Student.findAll()
            return res.status(200).json({ success: true, student: JSON.stringify(student, null, 2) });
        }catch (err){
            return res.status(404).json({ success: false, error: err });
        }
    },
    get_one: async function (req,res){
        try{
            const {id_student} = req.params;
            const student = await Student.findByPk(id_student);
              return res.status(200).json({ success: true, student: JSON.stringify(student, null, 2) });
        }catch (err){
            return res.status(404).json({ success: false, error: err });
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
            return res.status(200).json({ success: true, student: JSON.stringify(destroy, null, 2) });
        } catch (err) {
            return res.status(404).json({ success: false, error: err });
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
            return res.status(500).json({ success: false, error: err });
        }
    }
}