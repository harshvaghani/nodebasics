//we use templetingengine when we want to server HTML response file to cliet
//It generates dynamic html to send to the client
//we use app.render to retrive html dynamic content

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require('express');
const app = express();
app.use(express.json());
const morgan = require('morgan');


app.set('view engine', 'pug'); //it will internally load pug module 
app.set('views', './views') //set all the views inside a folder called views 

//debuggging function
if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    startupDebugger('Morgan Enabled...');
}


let students = [
    { id: 1, name: 'Harsh' },
    { id: 2, name: 'Vaghani' }
]

app.get('/api/courses/:id', (req, res) => {
    //we use render to execute any properties of a HTML file
    res.render('index', { title: 'My express app', message: 'Hello' })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('On port number 3000'));