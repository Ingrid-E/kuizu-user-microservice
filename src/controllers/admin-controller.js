const {Admin} = require('../models/index')
var express = require('express');
const { param } = require('../routes/users');

module.exports = {
    create_post: async function (req, res) {
        try {
            const {id_user} = req.params;
            const admin = await Admin.create({
                id_user: id_user
            },{fields:['id_user']})
            return res.status(201).json({ success: true, admin: JSON.stringify(admin, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to create a new admin" });

        }
    },
    get_all: async function (res) {
        try {
            const admin = await Admin.findAll()
            return res.status(201).json({ success: true, teacher: JSON.stringify(admin, null, 2) });
        } catch (err) {
            if(mistake){
                return res.status(500).json({ success: false, error: err, message: "Request failed"});
            }else{
                return res.status(404).json({ success: false, error: err, message: "It was not possible to get all admins" });
            }
        }
    },
    get_one: async function (req,res){
        try{
            const {id_admin} = req.params
            const admin = await Admin.findByPk(id_admin);
              return res.status(201).json({ success: true, admin: JSON.stringify(admin, null, 2) });
        }catch (err){
            return res.status(500).json({ success: false, error: err, message: "The admin does not exist" });
        }
    },
    delete_one: async function (req, res) {
        try {
            const { id_admin } = req.params
            const destroy = await User.destroy({
                where: {
                    id_admin: id_admin
                }
            })
            return res.status(201).json({ success: true, user: JSON.stringify(destroy, null, 2) });
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
            return res.status(201).json({ success: true, teacher: JSON.stringify(update, null, 2) });
        } catch (error) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to update the admin" });
        }
    }
}