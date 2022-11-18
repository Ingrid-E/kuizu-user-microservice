const {User, Admin, Student, Teacher} = require('../models/index')

module.exports = {
    create_post: async function (req, res) {
        try {
            const { firstname, lastname, imgurl, lastlogin, email } = req.body
            const user = await User.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                imgurl: imgurl,
                lastlogin: lastlogin
            })
            return res.status(200).json({ success: true, user: JSON.stringify(user, null, 2) });
        } catch (err) {
            return res.status(404).json({ success: false, error: err });

        }
    }
}