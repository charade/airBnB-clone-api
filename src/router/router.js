const express = require('express');

const router = express.Router();
require('dotenv').config();
const utils = require('../controller/controllerUtils');
const hostController = require('../controller/hostController');
const touristController = require('../controller/touristController');


/// //////////////// UTILS //////////////////////////////////////////////
router.post('/airbnb-clone/register', utils.signUp)
  .post('/airbnb-clone/login', utils.login, utils.authentication);

/// //////////////////////// HOST ///////////////////////////////////////
router.post('/airbnb-clone/places/add/:user_id/:city_name', hostController.add_a_place)
  .delete('/airbnb-clone/places/delete/:place_id/:user_id', hostController.delete_a_place)
  .get('/airbnb-clone/places/list/:user_id', hostController.get_host_places_list)
  .put('/airbnb/places/edit/:column/:place_id', hostController.modify_place_info)
  .get('/airbnb/places/places_booked/:user_id', hostController.all_host_booked_places);

/// /////////////////////////// TOURIST //////////////////////////////////

// url /places/availablity/:user_id/:place_id?check_in=...&check_out=...
router.get('/airbnb/places/availablity/:user_id/:place_id', touristController.add_place_to_bookmarks)
  .delete('/airbnb/places/booked/delete/:user_id/:booking_id', touristController.cancel_booked_place)// we need to add booked to make diferrence with the first delete request
  .get('/airbnb/places/booked/:user_id', touristController.all_places_booked)
  .get('/airbnb/places/available-places-by-date', touristController.search_places_byDate)
  .get('/airbnb/places/available-places-by-city', touristController.search_places_byCity);

module.exports = router;
