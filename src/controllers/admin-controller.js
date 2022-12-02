const { Admin } = require('../models/index')

module.exports = {
    create_post: async function (req, res) {
        try {
            const { id_user } = req.body
            const admin = await Admin.create({
                id_user: id_user
            })
            return res.status(201).json({ success: true, data: {title: "Admin created!", id_admin: admin.id_admin}});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }
    },
    get_all: async function (req, res) {
        try {
            const admin = await Admin.findAll()
            if(admin.length === 0){
                return res.status(404).json({success: false, data: {title: "Admins not found"}})
            }
            return res.status(200).json({ success: true, data: {count: admin.length, users}});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }
    },
    get_one: async function (req, res) {
        try {
            const { id_admin } = req.params;
            const admin = await Admin.findByPk(id_admin);
            if(admin === null){
                return res.status(404).json({success: false, data: {title: "Admin not found"}})
            }
            return res.status(200).json({ success: true, data: {admin}});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }

    },
    delete_one: async function (req, res) {
        try {
            const { id_admin } = req.params
            const admin = await Admin.destroy({
                where: {
                    id_admin: id_admin
                }
            })
            if(admin === 0){
                return res.status(404).json({success: false, data: {title: "Admin not found"}})
            }
            return res.status(200).json({ success: true, data: {title: "Admin deleted"}});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }
    },
    put_one: async function (req, res) {
        try {
            const { id_admin } = req.params;
            const { id_user } = req.body;
            const admin = await Admin.update({
                id_user: id_user
            }, {
                where: {
                    id_admin: id_admin
                }
            });
            if(admin[0] === 0){
                return res.status(404).json({success: false, data: {title: "Admin not found"}})
            }
            return res.status(200).json({ success: true, data: {title: "Admin updated"}});
        } catch (err) {
            return res.status(500).json({ success: false, data: {title: "Internal Server error", error: err.message}});
        }
    }
}
