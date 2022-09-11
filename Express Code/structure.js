const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
let stud = require('./routes/students')

//we should use exports module to structure a simple Node Code
app.use('/api/courses/', stud);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('On port number 3000'));