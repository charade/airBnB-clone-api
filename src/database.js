const mysql = require('mysql2');
require('dotenv').config();

const database = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
})

database.connect((err)=> console.log("error connection"));

module.exports = database;