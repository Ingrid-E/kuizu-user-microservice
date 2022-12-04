const { User } = require('../models/index')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

module.exports = {
    create_post: async function (req, res) {
        try {
            const {token} = req.body
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            })
            const {given_name, family_name, email, picture} = ticket.getPayload()
            const user = await User.create({
                firstname: given_name,
                lastname: family_name,
                email: email,
                imgurl: picture,
                lastlogin: Date.now()
            })
            return res.status(201).json({ success: true, data: {user}});
        } catch (err) {
            return res.status(500).json({ success: false, error: err.message, message: "It was not possible to create a user" });

        }
    },
    get_all: async function (req, res) {
        try {
            const users = await User.findAll()
            return res.status(201).json({ success: true, user: JSON.stringify(users, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to get all users" });
        }
    },
    get_one: async function (req, res) {
        try {
            const { id_user } = req.params;
            const admin = await User.findByPk(id_user)
            return res.status(201).json({ success: true, user: JSON.stringify(admin, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to get the user" });
        }

    },
    delete_one: async function (req, res) {
        try {
            const { id_user } = req.params
            const destroy = await User.destroy({
                where: {
                    id_user: id_user
                }
            })
            return res.status(201).json({ success: true, user: JSON.stringify(destroy, null, 2) });
        } catch (err) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to delete the user" });
        }
    },
    put_one: async function (req, res) {
        try {
            const { id_user } = req.params;
            const { firstname, lastname, imgurl, lastlogin, email } = req.body;
            const update = await Admin.update({
                firstname: firstname,
                lastname: lastname,
                email: email,
                imgurl: imgurl,
                lastlogin: lastlogin
            }, {
                where: {
                    id_user: id_user
                }
            });
            return res.status(201).json({ success: true, teacher: JSON.stringify(update, null, 2) });
        } catch (error) {
            return res.status(500).json({ success: false, error: err, message: "It was not possible to upgrade the user" });
        }
    }
}

