const sequelize = require('../configs/sequelize-conf')
const Teacher = require('./teacher-model')
const Admin = require('./admin-model')
const Student = require('./student-model')
const User = require('./user-model')

User.hasOne(Teacher, {foreignKey: 'id_user'});
User.hasOne(Admin, {foreignKey: 'id_user'});
User.hasOne(Student, {foreignKey: 'id_user'});

Teacher.belongsTo(User, {foreignKey: 'id_user'});
Admin.belongsTo(User, {foreignKey: 'id_user'});
Student.belongsTo(User, {foreignKey: 'id_user'});

sequelize.sync({force: false}).then(function () {
    console.log("Database Configured");
});

module.exports = {User, Teacher, Admin, Student};


