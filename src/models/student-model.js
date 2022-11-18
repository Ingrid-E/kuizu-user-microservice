const {DataTypes} = require('sequelize');
const db = require('../configs/sequelize-conf')
const Users = require('./user-model')

const Student = db.define('student',{
    id_student: {
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
}, {tableName: 'student',
    timestamps: false
});


module.exports = Student;