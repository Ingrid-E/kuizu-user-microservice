const {DataTypes} = require('sequelize');
const db = require('../configs/sequelize-conf')
const Users = require('./user-model')

const instanceMethods = {
    toJSON() {
        const values = Object.assign({}, this.get());

        return values;
    },
};

const Teacher = db.define('teacher',{
    id_teacher: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user_', // 'fathers' refers to table name
            key: 'id_user', // 'id' refers to column name in fathers table
         }
    }
}, {tableName: 'teacher',
timestamps: false
});





module.exports = Teacher;