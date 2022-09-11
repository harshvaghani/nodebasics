const express = require('express');
const app = express();
app.use(express.json());
const logger = require('./logger')
const auth = require('./authentication')
const morgan = require('morgan')



console.log(app.get('env'));