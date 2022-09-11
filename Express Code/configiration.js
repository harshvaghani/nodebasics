const config = require('config');
const express = require('express');
const app = express();
app.use(express.json());
const logger = require('./logger')
const auth = require('./authentication')
const morgan = require('morgan');

//sometimes we may want to use console.log in only developement environment rather than productive environment
//so there are process mrthod 
console.log(`NODE_ENV is: ${process.env.NODE_ENV}`);
console.log(app.get('env'));

//now for example if we want to use any middleware on our development machine 
if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('Morgan Enabled');
}

//$env:NODE_ENV = 'production' to set production environment in project  
app.use(logger)
app.use(auth)


//Configiration 
//We should not use password in our config JSON files for development environment.
//Rather we should make environment variables
// console.log('Mail Server Name:', config.get('mail.post'));

// console.log('Application Name:', config.get('name'));
// console.log('Mail Password:', config.get('mail_password'));
// if (!config.has('name')) {
//     console.error('FATAL ERROR: jwtPrivateKey is not defined');
//     process.exit(1); 
// }

let students = [
    { id: 1, name: 'Harsh' },
    { id: 2, name: 'Vaghani' }
]

app.get('/api/courses/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) res.status(404).send('There is no student');
    res.send(student);
    res.send()
})


app.post('/api/courses', (req, res) => {
    const student = { id: students.length + 1, name: req.body.name };
    students.push(student);
    res.send(student)
})