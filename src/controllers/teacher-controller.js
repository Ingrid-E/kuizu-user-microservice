const {Teacher} = require('../models/index')

module.exports = {
    create_post: async function (req, res) {
        try {
            const { id_user } = req.body
            const teacher = await Teacher.create({
                id_user: id_user
            })
            return res.status(200).json({ success: true, user: JSON.stringify(teacher, null, 2) });
        } catch (err) {
            return res.status(404).json({ success: false, error: err });

        }
    },
    get_all: async function (res){
        try{
            const teacher = await Teacher.findAll()
            return res.status(200).json({ success: true, teacher: JSON.stringify(teacher, null, 2) });
        }catch (err){
            return res.status(404).json({ success: false, error: err });
        }
    },
    get_one: async function (req,res){
        try{
            const {id_teacher} = req.params;
            const teacher = await Teacher.findAll({
                where: {
                  id_teacher: id_teacher
                }
              })
              return res.status(200).json({ success: true, teacher: JSON.stringify(teacher, null, 2) });
        }catch (err){
            return res.status(404).json({ success: false, error: err });
        }

    },
    delete_one: async function (req, res) {
        try {
            const { id_teacher } = req.params
            const destroy = await Teacher.destroy({
                where: {
                    id_teacher: id_teacher
                }
            })
            return res.status(200).json({ success: true, teacher: JSON.stringify(destroy, null, 2) });
        } catch (err) {
            return res.status(404).json({ success: false, error: err });
        }
    }
}