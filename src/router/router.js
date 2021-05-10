const express = require('express');

const router = express.Router();
require('dotenv').config();
const utils = require('../controller/controllerUtils');
const hostController = require('../controller/hostController');
const touristController = require('../controller/touristController');

/// //////////////// UTILS //////////////////////////////////////////////
router.post('/airbnb-clone/register', utils.signUp)
      .get('/airbnb-clone/place-info/:id', utils.get_a_place_info)
      .post('/airbnb-clone/login', utils.login, utils.authentication);

/// //////////////////////// HOST ///////////////////////////////////////
router.post('/airbnb-clone/places/add', hostController.add_a_place)
  .delete('/airbnb-clone/places/delete', hostController.delete_a_place)
  .post('/airbnb-clone/places/list', hostController.get_host_places_list)
  .patch('/airbnb/places/edit/:place_id', hostController.modify_place_info)
  .get('/airbnb/places/places_booked/:user_id', hostController.all_host_booked_places);

/// /////////////////////////// TOURIST //////////////////////////////////

// url /places/availablity/:user_id/:place_id?check_in=...&check_out=...
router.post('/airbnb-clone/places/availablity', touristController.add_place_to_bookmarks)
  .delete('/airbnb-clone/places/booked/delete/:user_id/:booking_id', touristController.cancel_booked_place)// we need to add booked to make diferrence with the first delete request
  .post('/airbnb-clone/places/booked', touristController.all_places_booked)
  .post('/airbnb-clone/places/available-places-by-date', touristController.search_places_byDate)
  .post('/airbnb-clone/search-by-city', touristController.search_places_byCity)
  .get('/airbnb-clone/places/available-places-by-city', touristController.search_places_byCity);

router.get('/airbnb-clone/places/last', utils.getAllPlaces);

module.exports = router;
