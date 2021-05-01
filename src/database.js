const mysql = require('mysql2');
require('dotenv').config();

const database = mysql.createConnection({

  host: process.env.HOST,
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = database.promise();
