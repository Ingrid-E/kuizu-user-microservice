const {Admin, User} = require('../models/index')
var express = require('express');
const { param } = require('../routes/users');

module.exports = {
    create_post: async function (req, res) {
        try {
            const {id_user} = req.params;
            let user_admin = id_user
            const admin = await Admin.create({
                id_user: user_admin
            },{fields:['id_user']})
            return res.status(200).json({ success: true, admin: JSON.stringify(admin, null, 2) });
        } catch (err) {
            return res.status(404).json({ success: false, error: err });

        }
    },
    get_one: async function (req,res){
        try{
            const {id_user1} = req.params
            let id_user = id_user1
            console.log(id_user);
            const admin = await User.findAll({
                attributes: ['firstname', 'lastname','imgurl','lastlogin','email'],
                where: {
                  id_user: id_user
                }
              })
              return res.status(200).json({ success: true, admin: JSON.stringify(admin, null, 2) });
        }catch (err){
            return res.status(404).json({ success: false, error: err });
        }

    }
}