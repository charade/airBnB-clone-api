const express = require('express');
const router = express.Router();

const utils = require('../controller/controllerUtils');
const hostController = require('../controller/hostController');
const touristController = require('../controller/touristController');


/////////////////// UTILS /////////////////////////////
router.post('/register', utils.signUp)
      .post('/login/:role', utils.login, utils.authentication);

/////////////////////////// HOST ////////////////////////////////////
router.post('/places/add/:user_id/:city_name', hostController.add_a_place)
      .delete('/places/delete/:place_id/:user_id', hostController.delete_a_place)
      .get('/places/list/:user_id', hostController.get_host_places_list)
      .put('/places/edit/:column/:place_id', hostController.modify_place_info)
      .post('/places/places_booked/:user_id', hostController.all_booked_places);

//url /places/availablity/:user_id/:place_id?check_in=...&check_out=...
router.get('/places/availablity/:user_id/:place_id', touristController.add_place_to_bookmarks);

module.exports = router ;
