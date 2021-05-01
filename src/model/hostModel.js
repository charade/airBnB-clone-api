const db = require('../database');
const mysql = require('mysql2');

//add a place. (host)
/**
 * 
 * @param place ---> place.available is a string array
 
 */
 exports.add_a_place = async(user_id, place, city_id)=>{
    return await db.query(`INSERT INTO places(cities_id, users_id, name, description, rooms, bathrooms, max_guests, price_by_night, available) VALUES(${city_id}, ${user_id}, ${place.name}, ${place.description}, ${place.rooms}, ${place.bathrooms}, ${place.max_guests}, ${place.price_by_night}, ${place.available});`);
}

//host's places list
exports.get_places_in_rent_list = async (user_id)=>{
    return await db.query(`SELECT places.id, cities_id, name, description, rooms, bathrooms, max_guests, price_by_night, available, email FROM places INNER JOIN users ON places.users_id = users.id WHERE places.users_id = ${user_id} AND users.role = "hote";`);
}

//host can change a place info
exports.editInfo = async(column, newValue, place_id)=>{
    // newValue = typeof newValue == "string" ? `"${newValue}"`: `${newValue}`;
    return await db.query(`UPDATE places SET ${column} = "${newValue}" WHERE places.id = ${place_id};`);
}

//all booked place
exports.all_booked_places = async (user_id)=>{
    return await db.query(`SELECT name, rooms, bathrooms, max_guests, price_by_night, available, cities_id, description,check_in, check_out FROM booking
    INNER JOIN places INNER JOIN users ON
    booking.places_id = places.id AND places.users_id = users.id WHERE users.id=${user_id};`);
}

//refecto table..ON DELETE CASCADE
//delete a place
exports.delete_a_place = async (place_id, user_id)=>{
    return await db.query(`DELETE FROM places WHERE places.id = ${place_id} AND places.users_id = ${user_id};`);
}

