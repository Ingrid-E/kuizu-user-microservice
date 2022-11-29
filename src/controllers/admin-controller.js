const { Admin } = require('../models/index')

module.exports = {
    create_post: async function (req, res) {
        try {
            const { id_user } = req.body
            const admin = await Admin.create({
                id_user: id_user
            })
            return res.status(201).json({ success: true, admin: JSON.stringify(admin, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to create a new admin" });
        }
    },
    get_all: async function (req, res) {
        try {
            const admin = await Admin.findAll()
            return res.status(201).json({ success: true, admin: JSON.stringify(admin, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to get all admins" });
        }
    },
    get_one: async function (req, res) {
        try {
            const { id_admin } = req.params;
            const admin = await Admin.findByPk(id_admin);
            return res.status(201).json({ success: true, admin: JSON.stringify(admin, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to get the admin" });
        }

    },
    delete_one: async function (req, res) {
        try {
            const { id_admin } = req.params
            const destroy = await Admin.destroy({
                where: {
                    id_admin: id_admin
                }
            })
            return res.status(201).json({ success: true, admin: JSON.stringify(destroy, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to delete the admin" });
        }
    },
    put_one: async function (req, res) {
        try {
            const { id_admin } = req.params;
            const { id_user } = req.body;
            const update = await Admin.update({
                id_user: id_user
            }, {
                where: {
                    id_admin: id_admin
                }
            });
            return res.status(201).json({ success: true, admin: JSON.stringify(update, null, 2) });
        } catch (error) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to update the admin" });
        }
    }
}
