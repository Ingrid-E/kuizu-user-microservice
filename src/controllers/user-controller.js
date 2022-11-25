const {User} = require('../models/index')

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
    },
    get_all: async function (req,res){
        try{
            const users = await User.findAll()
            return res.status(200).json({ success: true, user: JSON.stringify(users, null, 2) });
        }catch (err){
            return res.status(404).json({ success: false, error: err });
        }
    },
    get_one: async function (req,res){
        try{
            const {id_user} = req.params;
            const admin = await User.findAll({
                attributes: ['firstname', 'lastname','imgurl','lastlogin','email'],
                where: {
                  id_user: id_user
                }
              })
              console.log("hi",id_user)
              return res.status(200).json({ success: true, user: JSON.stringify(admin, null, 2) });
        }catch (err){
            return res.status(404).json({ success: false, error: err });
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
            return res.status(200).json({ success: true, user: JSON.stringify(destroy, null, 2) });
        } catch (err) {
            return res.status(404).json({ success: false, error: err });
        }
    }
}

