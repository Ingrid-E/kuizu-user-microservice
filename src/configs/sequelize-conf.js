const { Sequelize } = require('sequelize');
const SequelizeMock = require('sequelize-mock');
var db
if(process.env.NODE_ENV != 'test'){
    db = new Sequelize(
        process.env.PG_DATABASE,
        process.env.PG_USER,
        process.env.PG_PASSWORD,
        {
        host: process.env.PG_HOST,
        dialect: 'postgres'
        }
    );
}else{
    db = new SequelizeMock()
}

module.exports = db;