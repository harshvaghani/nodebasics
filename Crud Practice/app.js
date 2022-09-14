//to create a database you will need mongoconnection
//class to initialize collection 
//object of that class
//create
const express = require('express');
const { default: mongoose } = require('mongoose');
require("dotenv").config();
// require("express-async-errors");
const app = express();
app.use(express.json());


const neData = require('./models/mydata')

mongoose.connect('mongodb://localhost/content').then(() => {
    console.log('connectec succefully');
}).catch((err) => console.log('Error', err))

// const mySchema = new mongoose.Schema({
//     name: String,
//     amount: Number
// })


// const myData = mongoose.model('myContent', mySchema, 'myContent');

// app.post('/mydata', async(req, res) => {
//     newData = new neData({
//         name: req.body.name,
//         amount: req.body.amount
//     })
//     const result = await newData.save();

//     res.send(result)
// });

//routes 

require('./routes/myroutes')(app)


app.listen(3000, () => {
    console.log('listening on port 3000');
})