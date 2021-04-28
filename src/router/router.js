const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.post('/register',controller.signUp);

router.post('/login/:role', controller.login, controller.authentication);
router.post('/places/add/:user_id/:city_name', controller.add_a_place);
router.get('/places/delete/:place_id/:user_id', controller.delete_a_place);
router.get('/places/list/:user_id', controller.get_host_places_list);
router.post('/places/edit/:column/:place_id', controller.modify_place_info);
router.post('/places/places_booked/:user_id', controller.all_booked_places);


module.exports = router ;
