const { User } = require('../models/index')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const AWS = require('aws-sdk');
const request = require('request');
const { resolve } = require('path');
const { reject } = require('lodash');


AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
});

const s3 = new AWS.S3();



const uploadImage = async (email, google_url)=>{
    return new Promise((resolve, reject)=>{
        request.get({url: google_url, encoding: null},  (err, response, body)=>{
            
            const buffer = new Buffer.from(body, 'binary');
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `users/${email}`,
                Body: buffer,
                ContentType: response.headers['content-type'],
                ACL: "public-read"
            };
    
            s3.upload(params, (err, data)=>{
                if(err){
                    return reject(err)
                }
                return resolve(data.Location)
            })
        })
    })
}

module.exports = {
    create_post: async function (req, res) {
        try {
            const { token } = req.body
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            })
            const { given_name, family_name, email, picture } = ticket.getPayload()
            
            const imgS3URL = await uploadImage(email, picture)
            console.log("IMAGE S3: " +  imgS3URL)
            const email_dir = await User.findOne({
                where: {
                    email: email
                }
            })

            if (email_dir === null) {
                const user = await User.create({
                    firstname: given_name,
                    lastname: family_name,
                    email: email,
                    imgurl: imgS3URL,
                    lastlogin: Date.now()
                })
                return res.status(201).json({ success: true, data: { title: "User created!", user } });
            } else {
                const update_user = await User.update({
                    firstname: given_name,
                    lastname: family_name,
                    email: email,
                    imgurl: imgS3URL,
                    lastlogin: Date.now()
                }, {
                    where: {
                        email: email
                    }
                });
                const user = await User.findOne({
                    where: {
                        email: email
                    }
                })
                return res.status(200).json({ success: true, data: { title: "User updated", user: user } });
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
                lastlogin: Date.now()
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

