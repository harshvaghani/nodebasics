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

//third party middleware

//or we can use external function 
app.use(logger)

app.use(function(req, res, next) {
    console.log('Authenticating');
    next();
});
//or use exported function 
app.use(auth)


//we also have built-in middleware similar to app.use(express.JSON)
app.use(express.urlencoded({ extended: true })); //this middleware function parses incoming request with URL incoded payload -- key=value&key=value 
//urlencoded is used to wotk with postman request in which we can give key and value pair   

app.use(express.static('public')); //we will put every css and images documents inside this folder 



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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('On port number 3000'));