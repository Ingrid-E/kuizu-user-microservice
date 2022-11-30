const { Teacher } = require('../models/index')


const exist = (id_teacher) => {
    const verify = Teacher.count({
        where: {
            id_teacher: id_teacher
        }
    }).then(count => {
        if (count != 0) return true;
        else return false;
    });

    return verify;
}

module.exports = {
    create_post: async function (req, res) {
        try {
            const { id_user } = req.body
            const teacher = await Teacher.create({
                id_user: id_user
            })
            return res.status(201).json({ success: true, teacher: JSON.stringify(teacher, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to create a new teacher" });

        }
    },
    get_all: async function (req, res) {
        try {
            const teacher = await Teacher.findAll()

            exist(1).then(exists => {
                if (exists) {
                    console.log("ohana existss!");
                } else {
                    console.log("buu does not exists!");
                }
            });

            return res.status(201).json({ success: true, teacher: JSON.stringify(teacher, null, 2) });

        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to get all teachers" });
        }
    },
    get_one: async function (req, res) {
        const { id_teacher } = req.params;
        try {
            const teacher = await Teacher.findByPk(id_teacher);
            return res.status(201).json({ success: true, teacher: JSON.stringify(teacher, null, 2) });
        } catch (err) {
            exist(id_teacher).then(exists => {
                if (exists) {
                    return res.status(500).json({ success: false, error: err, message: "It was not possible to get the teacher" });
                } else {
                    return res.status(404).json({ success: false, error: err, message: "Request failed" });
                }
            });

        }

    },
    delete_one: async function (req, res) {
        const { id_teacher } = req.params
        try {
            const destroy = await Teacher.destroy({
                where: {
                    id_teacher: id_teacher
                }
            })
            return res.status(201).json({ success: true, teacher: JSON.stringify(destroy, null, 2) });
        } catch (err) {
            exist(id_teacher).then(exists => {
                if (exists) {
                    return res.status(500).json({ success: false, error: err, message: "It was not possible to delete the teacher" });
                } else {
                    return res.status(404).json({ success: false, error: err, message: "Request failed" });
                }
            });
        }
    },
    put_one: async function (req, res) {
        const { id_teacher } = req.params;
        try {
            const { id_user } = req.body;
            const update = await Teacher.update({
                id_user: id_user
            }, {
                where: {
                    id_teacher: id_teacher
                }
            });
            return res.status(201).json({ success: true, teacher: JSON.stringify(update, null, 2) });
        } catch (error) {
            exist(id_teacher).then(exists => {
                if (exists) {
                    return res.status(500).json({ success: false, error: err, message: "It was not possible to update the teacher" });
                } else {
                    return res.status(404).json({ success: false, error: err, message: "Request failed" });
                }
            });
        }
    }
}





