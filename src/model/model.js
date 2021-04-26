
const db = require('../database');
const mysql = require('mysql2');

//signup
exports.createAccount = (user,callback) =>{
    db.query(`INSERT INTO users(email, password, first_name, last_Name, role) VALUES(${mysql.escape(user.email)}, ${mysql.escape(user.password)}, ${mysql.escape(user.first_name)}, ${mysql.escape(user.last_Name)}, ${mysql.escape(user.role)});`,(err,response)=>{
        if(err){
            callback(err, null);
            return;
        }
        return callback(null, response);
    })
}

//login tourist
exports.loginTourist = (user,callback) =>{
    db.query(`SELECT * FROM users  WHERE email = ${mysql.escape(user.email)} AND  password = ${mysql.escape(user.password)} AND role = tourist);`,(err,response)=>{

        if(err){
            callback(err, null);
            return;
        }
        return callback(null, response);
    })
}

//login host
exports.loginHost = (user,callback) =>{
    db.query(`SELECT * FROM users  WHERE email = ${mysql.escape(user.email)} AND  password = ${mysql.escape(user.password)} AND role = host);`,(err,response)=>{

        if(err){
            callback(err, null);
            return;
        }
        return callback(null, response);
    })
}



