const { Teacher } = require('../models/index')

var mistake;

const exist = (id_teacher) => {
    const data = Teacher.count({
        where: {
            id_teacher: id_teacher
        }
    });
    
    if (data.id_teacher != 0) return true;
    else return false;
}

module.exports = {
    create_post: async function (req, res) {
        try {
            const { id_user } = req.body
            const teacher = await Teacher.create({
                id_user: id_user
            })
            return res.status(201).json({ success: true, user: JSON.stringify(teacher, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err });

        }
    },
    get_all: async function (res) {
        try {
            const teacher = await Teacher.findAll()
            return res.status(201).json({ success: true, teacher: JSON.stringify(teacher, null, 2) });
        } catch (err) {
            if(mistake){
                return res.status(500).json({ success: false, error: err, message: "Request failed"});
            }else{
                return res.status(404).json({ success: false, error: err, message: "The teacher does not exist" });
            }
        }
    },
    get_one: async function (req, res) {
        const { id_teacher } = req.params;
        mistake = exist(id_teacher);
        try {
            const { id_teacher } = req.params;
            const teacher = await Teacher.findByPk(id_teacher);
            return res.status(201).json({ success: true, teacher: JSON.stringify(teacher, null, 2) });
        } catch (err) {
            if(mistake){
                return res.status(500).json({ success: false, error: err, message: "Request failed"});
            }else{
                return res.status(404).json({ success: false, error: err, message: "The teacher does not exist" });
            }
        }
    },
    delete_one: async function (req, res) {
        const { id_teacher } = req.params;
        mistake = exist(id_teacher);
        try {
            const { id_teacher } = req.params
            const destroy = await Teacher.destroy({
                where: {
                    id_teacher: id_teacher
                }
            })
            return res.status(200).json({ success: true, teacher: JSON.stringify(destroy, null, 2) });
        } catch (err) {
            if(mistake){
                return res.status(500).json({ success: false, error: err, message: "Request failed"});
            }else{
                return res.status(404).json({ success: false, error: err, message: "There is not a teacher with this id" });
            }
        }
    },
    put_one: async function (req, res) {
        const { id_teacher } = req.params;
        mistake = exist(id_teacher);
        try {
            const { id_teacher } = req.params;
            const { new_id_user } = req.body;
        
            const update = await User.update({
                id_user: new_id_user
            },{
                where:{
                    id_teacher:id_teacher
                }
            });
            return res.status(201).json({ success: true, teacher: JSON.stringify(update, null, 2) });
        } catch (error) {
            if(mistake){
                return res.status(500).json({ success: false, error: err, message: "Request failed"}); 
            }else{
                return res.status(404).json({ success: false, error: err, message: "The teacher does not exist" });
            }
        }
    }
}