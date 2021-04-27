const db = require('../database');
const mysql = require('mysql2');





//get all cities
exports.getAllCities = ()=>{
    db.query('SELECT * FROM cities;', (err,response)=>{
        if(err){
            callback(err, null);
            return;
        }
        callback(null, response);
    })
}

//////////////////////////////////////////////////// HOST ////////////////////////////////////////

//login host
// exports.loginHost = (email,callback)=>{
//     db.query(`SELECT * FROM users  WHERE email = ${mysql.escape(email)} AND role = host);`,(err,response)=>{

//         if(err){
//             callback(err, null);
//             return;
//         }
//         callback(null, response);
//     })
// }

//add a place. (host)
/**
 * 
 * @param place ---> place.available is a string array
 
 */
exports.add_a_place = (user_id, place, city_id, callback)=>{
    db.query(`INSERT INTO places(cities_id, users_id, name, description, rooms, bathrooms, max_guests, price_by_night, available) VALUES(${city_id},${user_id},${place.description},${place.rooms},${place.bathrooms},${place.max_guests},${place.price_by_night},${place.available});`,(err,response)=>{
        if(err){
            callback(err, null);
            return;
        }
        callback(null, response);
    })
}

//host's places list
exports.get_places_in_rent_list = (user_id, callback)=>{
    db.query(`SELECT * FROM places INNER JOIN users ON places.user_id = users.id WHERE places.users_id = ${user_id};`, (err,response)=>{

        if(err){
            callback(err, null);
            return;
        }
        callback(null , response);
    })
}

//host can change a place info
exports.editInfo = (column, newValue, callback)=>{
    db.query(`UPDATE places SET ${column} = ${newValue};`,(err, response)=>{

        if(err){
            callback(err,null);
            return;
        }
        callback(null, response);
    })
}

//all booked place
exports.all_booked_places = (user_id, callback)=>{
    db.query(`SELECT * FROM booking
             INNER JOIN places INNER JOIN users ON 
             booking.places_id = places.id AND places.users_id = users.id WHERE users.id=${user_id};`,(err, response)=>{

                if(err){
                    callback(err, null);
                    return;
                }
                callback(null, response);
             })
}


//refecto table..ON DELETE CASCADE
//delete a place
exports.delete_a_place = (place_id, callback)=>{
    db.query(`DELETE FROM places WHERE places.id = ${place_id};`,(err, response)=>{
        
        if(err){
            callback(err, null);
            return;
        }
        callback(null, response);
    })
}

///////////////////////////////////////// VISITOR ///////////////////////////////////////////

//get all places in a chosen city
exports.all_place_in_the_city = (city_id, callback)=>{
    db.query(`SELECT * FROM places INNER JOIN cities ON places.cities_id = cities.id WHERE city.id = ${city_id};`,(err, response)=>{
        
        if(err){
            callback(err, null);
            return;
        }
        callback(null, response);
    })
}


//get avaible places between two dates
/**
 * @ places.available must return a LONG TEXT we need to split before use in order to check if the user's date entry is in
 */
exports.get_available_places = (callback)=>{
    db.query(`SELECT * FROM places INNER JOIN booking on booking.places_id = places.id  WHERE booking.check_in >= date.now() ;`,(err, response)=>{

        if(err){
            callback(err, null);
            return;
        }
        callback(null, response);
    })
}
/////////////////////////////////////////////////// TOURTIST /////////////////////////////////////////////////////////


//login tourist
exports.login = (email, role, callback)=>{
    db.query(`SELECT * FROM users  WHERE email = ${mysql.escape(email)}  AND role = "${role}";`, (err,response)=>{

        if(err){
            callback(err, null);
            return;
        }
        callback(null, response);
    })
}



//booking a place
exports.book_a_place = (user_id, place_id, date, callback)=>{
    db.query(`INSERT INTO booking(users_id, places_id, check_in, check_out) VALUES(${user_id}, ${place_id}, ${date.in}, ${date.out})`, (err, response)=>{

        if(err){
            callback(err, null);
            return;
        }
        callback(null, response);
    })
}

//get all booking
exports.all_places_booked = (user_id, callback) =>{
    db.query(`SELECT * FROM booking INNER JOIN users ON booking.users_id = users.id WHERE users.id = users_id;`,(err,response)=>{

        if(err){
            callback(err,null);
            return;
        }
        callback(null, response);
    })
}

// cancel a booked place
exports.cancelBooking = (booking_id, callback)=>{
    db.query(`DELETE FROM booking WHERE id = ${booking_id};`, (err, response)=>{

        if(err){
            callback(err, null);
            return;
        }
        callback(null, response);
    })
}

////////////////////////////////////////////////// HOST & TOURIST ////////////////////////////////////////////////////

exports.getUser = ( email, role, callback) =>{
    db.query(`SELECT * FROM users WHERE email = ${mysql.escape(email)} AND role = ${mysql.escape(role)};`, (err, response)=>{
        if(err){
            callback(err, null);
            return;
        }
        callback(null, response);
    })
}

///////////////////////////////////////////////// ALL USERS INCLUDING VISITORS ///////////////////////////////////////

// get one place info
exports.get_a_place_info = (place_id, callback)=>{
 db.query(`SELECT * FROM places INNER JOIN users ON places.users_id = users.id WHERE places.id = ${place_id};`
    ,(err,response)=>{
        
        if(err){
            callback(err, null);
            return;
        }
        callback(null, response);
    })
}

//signup
exports.createAccount = (user,callback)=>{
    db.query(`INSERT INTO users(email, password, first_name, last_Name, role) VALUES(${mysql.escape(user.email)}, ${mysql.escape(user.password)}, ${mysql.escape(user.first_name)}, ${mysql.escape(user.last_Name)}, ${mysql.escape(user.role)});`,(err,response)=>{
        if(err){
            callback(err, null);
            return;
        }
        return callback(null, response);
    })
}