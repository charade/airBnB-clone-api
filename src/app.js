require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./router/router');

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(port));
