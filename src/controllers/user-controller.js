const { User } = require('../models/index')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

module.exports = {
    create_post: async function (req, res) {
        try {
            const { token } = req.body
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            })
            const { given_name, family_name, email, picture } = ticket.getPayload()

            const email_dir = await User.findAll({
                where: {
                    email: email
                }
            })

            if (email_dir.length === 0) {
                const user = await User.create({
                    firstname: given_name,
                    lastname: family_name,
                    email: email,
                    imgurl: picture,
                    lastlogin: Date.now()
                })
                return res.status(201).json({ success: true, data: { title: "User created!", user } });
            }else{
                return res.status(200).json({ success: true, data: { title: "User updated" } });
            }
        } catch (err) {
            return res.status(500).json({ success: false, data: { title: "Internal Server error", error: err.message } });
        }
    },
    get_all: async function (req, res) {
        try {
            const users = await User.findAll()
            if (users.length === 0) {
                return res.status(404).json({ success: false, data: { title: "User not found" } })
            }
            return res.status(200).json({ success: true, data: { count: users.length, users } });
        } catch (err) {
            return res.status(500).json({ success: false, data: { title: "Internal Server error", error: err.message } });
        }
    },
    get_one: async function (req, res) {
        try {
            const { id_user } = req.params;
            const user = await User.findByPk(id_user)
            if (user === null) {
                return res.status(404).json({ success: false, data: { title: "User not found" } })
            }
            return res.status(200).json({ success: true, data: { user } });
        } catch (err) {
            return res.status(500).json({ success: false, data: { title: "Internal Server error", error: err.message } })
        }

    },
    delete_one: async function (req, res) {
        try {
            const { id_user } = req.params
            const user = await User.destroy({
                where: {
                    id_user: id_user
                }
            })
            if (user === 0) {
                return res.status(404).json({ success: false, data: { title: "User not found" } })
            }
            return res.status(200).json({ success: true, data: { title: "User deleted" } });
        } catch (err) {
            return res.status(500).json({ success: false, data: { title: "Internal Server error", error: err.message } });
        }
    },
    put_one: async function (req, res) {
        try {
            const { id_user } = req.params;
            const { firstname, lastname, imgurl, lastlogin, email } = req.body;
            const user = await User.update({
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
            if (user[0] === 0) {
                return res.status(404).json({ success: false, data: { title: "User not found" } })
            }
            return res.status(200).json({ success: true, data: { title: "User updated" } });
        } catch (err) {
            return res.status(500).json({ success: false, data: { title: "Internal Server error", error: err.message } });
        }
    }
}

