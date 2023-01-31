const {DataTypes} = require('sequelize');
const db = require('../configs/sequelize-conf')

const User = db.define('user_',{
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(200)
    },
    imgurl: {
        type: DataTypes.STRING(300)
    },
    lastlogin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {tableName: 'user_',
    timestamps: false
});

(async () => {
    await User.sync();

  })();

module.exports = User;