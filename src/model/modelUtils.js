const mysql = require('mysql2');
const db = require('../database');

// signup
exports.createAccount = async (user) => await db.query(`INSERT INTO users(email, password, first_name, last_name, role) VALUES(${mysql.escape(user.email)}, ${mysql.escape(user.password)}, ${mysql.escape(user.first_name)}, ${mysql.escape(user.last_name)}, ${mysql.escape(user.role)});`);

// get all places in a chosen city
exports.all_places_in_the_city = async (city_id) => await db.query(`SELECT * FROM places INNER JOIN cities ON places.cities_id = cities.id WHERE cities.id = ${city_id};`);

exports.all_places = async () => await db.query(`SELECT id, name, description FROM places ORDER BY id DESC LIMIT 20; `);

// login tourist
exports.login = async (email) => await db.query(`SELECT * FROM users  WHERE email = ${mysql.escape(email)};`);

/// /////////////////////////////////////////////// HOST & TOURIST ////////////////////////////////////////////////////

exports.getUser = async (email) => await db.query(`SELECT * FROM users WHERE email = ${mysql.escape(email)};`);

// get a city
exports.get_a_city_byName = async (city_name) => await db.query(`SELECT id FROM cities WHERE name = '${city_name}';`);

exports.get_a_city_byId = async (city_id) => await db.query(`SELECT name FROM cities WHERE id = ${city_id};`);

// get one place info
exports.get_a_place_info = async (place_id, callback) => await db.query(`SELECT * FROM places INNER JOIN users ON places.users_id = users.id WHERE places.id = ${place_id};`);

// exports.modelT = async (city) => await db.query(`INSERT INTO cities(name) VALUES('${city}');`)