const express = require('express');
require('dotenv').config();
const router = require('../router/router');

const app = express();

app.use(router);
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log("running on port " + port));



