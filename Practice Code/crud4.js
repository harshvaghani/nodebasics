const express = require("express");
const { date } = require("joi");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const morgan = require('morgan')
const schemaFunc = require('./validate');
app.use(morgan('tiny'));


mongoose.connect('mongodb://localhost/content')
    .then(() => console.log('Database id connecte'))
    .catch((err) => console.log('Database Erorr', err))

//model class object

const contentSchema = new mongoose.Schema({
    name: String,
    number: Number,
    isActive: Boolean,
})

const Content = mongoose.model('myContent', contentSchema, 'myContent')


app.post('/content', async(req, res) => {

    const result = schemaFunc(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message); //only erorr message
        return;
    }

    const content = new Content({
        name: req.body.name,
        number: req.body.number,
        isActive: req.body.isActive,
    })

    await content.save()

    res.send({ content });
});

app.patch('/content/:id', async(req, res) => {
    const result = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.send({ result })
})

app.delete('/content/:id', async(req, res) => {
    const result = await Content.findByIdAndDelete(req.params.id)
    res.send({ result })
})


app.get('/content', async(req, res) => {
    const data = await Content.find()
    res.send({ data })
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
});