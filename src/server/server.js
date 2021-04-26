const express = require('express');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const router = require('../router/router');
const app = express();

app.use(cookieParser());
app.use(router);
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log("running on port " + port));



