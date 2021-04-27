require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('../router/router');
const controller = require('../controller/controller');

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);


const port = process.env.PORT || 8080;

app.listen(port, ()=> console.log("running on port " + port));


