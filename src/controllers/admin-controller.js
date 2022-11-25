const { Admin} = require('../models/index')
var express = require('express');
const { param } = require('../routes/users');

module.exports = {
    create_post: async function (req, res) {
        try {
            const { id_user } = req.body;
            const admin = await Admin.create({
                id_user: id_user
            })
            return res.status(200).json({ success: true, admin: JSON.stringify(admin, null, 2) });
        } catch (err) {
            return res.status(404).json({ success: false, error: err });

        }
    },
    get_one: async function (req, res) {
        try {
            const { id_admin } = req.params
            const admin = await Admin.findAll({
                where: {
                    id_admin: id_admin
                }
            })
            return res.status(200).json({ success: true, admin: JSON.stringify(admin, null, 2) });
        } catch (err) {
            return res.status(404).json({ success: false, error: err });
        }
    },
    get_all: async function (req,res){
        try{
            const admin = await Admin.findAll()
            return res.status(200).json({ success: true, admin: JSON.stringify(admin, null, 2) });
        }catch (err){
            return res.status(404).json({ success: false, error: err });
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
            return res.status(200).json({ success: true, admin: JSON.stringify(destroy, null, 2) });
        } catch (err) {
            return res.status(404).json({ success: false, error: err });
        }
    }
}