const express = require('express');
const app = express();
app.use(express.json());
const logger = require('./logger')
const auth = require('./authentication')
const morgan = require('morgan');

// app.use(express.JSON); 
//this type of function will return a midle ware function
//The work of middle ware function is to read request of the body. It will parse JSON object in the requests req.body parse
//for example if we have an object that needs to be parsed in JSON format

//every request come in a server we can create middlerware to perform some tasks such as logging, authentication, authorisation, etc
//we should always put another middle ware function in a diffrent file 

//creating a custom middleware function

// app.use(function(req, res, next) {
//     console.log('Logging');
//     next();
// });

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

//third party middleware
app.use(morgan('tiny'))

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