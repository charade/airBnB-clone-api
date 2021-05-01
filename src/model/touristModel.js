const mysql = require('mysql2');
const db = require('../database');

// booking a place
exports.book_a_place = async (user_id, place_id, date) => await db.query(`INSERT INTO booking(users_id, places_id, check_in, check_out) VALUES(${user_id}, ${place_id}, '${date.in}', '${date.out}');`);

exports.isplaceBooked = async (place_id) => await db.query(`SELECT * FROM booking where places_id = ${mysql.escape(place_id)};`);

// get all booking
exports.all_places_booked = (user_id, callback) => {
  db.query('SELECT * FROM booking INNER JOIN users ON booking.users_id = users.id WHERE users.id = users_id;', (err, response) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, response);
  });
};

// cancel a booked place
exports.cancelBooking = async (user_id, booking_id) => await db.query(`DELETE FROM booking WHERE id = ${booking_id} AND users_id = ${user_id};`);

exports.get_all_booked_places = async (user_id) => await db.query(`SELECT places_id, check_in, check_out, rooms, bathrooms, max_guests, cities_id, name, price_by_night,description  FROM booking INNER JOIN users INNER JOIN places ON booking.users_id = users.id AND booking.places_id = places.id WHERE users.id = ${user_id} AND role = "touriste" ;`);
// get avaible places between two dates
/**
 * @ places.available must return a LONG TEXT we need to split before use in order to check if the user's date entry is in
 */
exports.get_all_places = async () => await db.query('SELECT * FROM places;');

/// // search places ////
