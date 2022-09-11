const express = require("express");
const Joi = require("joi");
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const validator = require('./validate2')
const morgan = require('morgan')
app.use(morgan('tiny'));


//Connect to a server 
mongoose.connect('mongodb://localhost/content')
    .then(() => console.log('Database created'))
    .catch((err) => console.log('Database Error', err));

//make a schema

const sportsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    about: mongoose.Schema.Types.Mixed,
    isActive: Boolean,
    rank: Number,
})

//create a class with model 
const Content = mongoose.model('Content', sportsSchema);

app.post('/content', async(req, res) => {


    const result2 = validator(req.body);
    if (result2.error) {
        res.status(400).send(result2.error.details[0].message); //only erorr messageA
        return;
    }

    const content = new Content({
        name: req.body.name,
        about: req.body.about,
        isActive: req.body.isActive,
        rank: req.body.rank,
    })

    const result = await content.save();
    res.send({ result });
})

app.patch('/content/:id', async(req, res) => {
    const result = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.send(result);
});

app.delete('/content/:id', async(req, res) => {
    const result = await Content.findByIdAndDelete(req.params.id)
    res.send({ result })
});



app.get('/content/:id', async(req, res) => {
    const result = await Content.findById(req.params.id)
    res.send({ result })
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
});