const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.post('/register',controller.signUp);

router.post('/login/:role', controller.login, controller.authentication);



module.exports = router ;
