const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require('express');
const app = express();
app.use(express.json());
const morgan = require('morgan');

//$env:DEBUG = 'app:startup' use it as debugging environment 
//after than we can even reset the environemtn with $env:DEBUG = ''
//for multiple debugging environment : $env:DEBUG = 'app:startup','app:db''
//Or to run all the debugging environemt:  $env:DEBUG = '*'
if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    startupDebugger('Morgan Enabled...');
}

///debugging for DB 
dbDebugger('Connected to the Database');


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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('On port number 3000'));