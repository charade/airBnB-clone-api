const express = require('express');

const router = express.Router();

const utils = require('../controller/controllerUtils');
const hostController = require('../controller/hostController');
const touristController = require('../controller/touristController');

/// //////////////// UTILS //////////////////////////////////////////////
router.post('/register', utils.signUp)
  .post('/login/:role', utils.login, utils.authentication);

/// //////////////////////// HOST ///////////////////////////////////////
router.post('/places/add/:user_id/:city_name', hostController.add_a_place)
  .delete('/places/delete/:place_id/:user_id', hostController.delete_a_place)
  .get('/places/list/:user_id', hostController.get_host_places_list)
  .put('/places/edit/:column/:place_id', hostController.modify_place_info)
  .get('/places/places_booked/:user_id', hostController.all_host_booked_places);

/// /////////////////////////// TOURIST //////////////////////////////////

// url /places/availablity/:user_id/:place_id?check_in=...&check_out=...
router.get('/places/availablity/:user_id/:place_id', touristController.add_place_to_bookmarks)
  .delete('/places/booked/delete/:user_id/:booking_id', touristController.cancel_booked_place)// we need to add booked to make diferrence with the first delete request
  .get('/places/booked/:user_id', touristController.all_places_booked)
  .get('/places/available-places-by-date', touristController.search_places_byDate)
  .get('/places/available-places-by-city', touristController.search_places_byCity);

module.exports = router;
