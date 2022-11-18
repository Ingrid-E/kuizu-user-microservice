require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var usersRouter = require('./src/routes/users');
var sequelize = require('./src/configs/sequelize-conf')
var app = express();
const db = require('./src/configs/sequelize-conf')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);

db.authenticate()
.then(()=>{
    console.log('Connection has been established successfully.');
})
.catch(err =>{
    console.error('Unable to connect to the database:', err);

})

module.exports = app;
