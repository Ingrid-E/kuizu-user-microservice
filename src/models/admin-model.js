const {DataTypes} = require('sequelize');
const db = require('../configs/sequelize-conf')
const Users = require('./user-model')

const Admin = db.define('admin',{
    id_admin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user_',
            key: 'id_user'
         }
    }
}, {tableName: 'admin',
    timestamps: false
});

module.exports = Admin;