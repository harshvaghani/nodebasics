const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");


mongoose.connect('mongodb://localhost/content')
    .then(() => console.log('Database id connecte'))
    .catch((err) => console.log('Database Erorr', err))

let contentSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    rank: Number,
    date: { type: Date, default: Date.now },
    isActive: Boolean
})

let NewContent = mongoose.model('register', contentSchema, 'register');

app.post('/content', async(req, res) => {
    const mySchema = new NewContent({
        name: req.body.name,
        rank: req.body.rank,
        isActive: req.body.isActive,
    })

    const token = await mySchema.generateToken()

    // converting password into hash
    contentSchema.methods.generateToken = async function(next) {
        try {
            const token = await jwt.sign({ _id: this._id. }, "mynameisharshvaghanimaheshbhai");
            console.log(token);
        } catch (err) {
            console.log(err);
        }
    }

    const result = await mySchema.save();
    res.send(result)
})


app.patch('/content/:id', async(req, res) => {
    const result = await NewContent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.send(result)
});

app.delete('/content/:id', async(req, res) => {
    const result = await NewContent.findByIdAndDelete(req.params.id)
    res.send(result)
});

app.get('/content/:id', async(req, res) => {
    const result = await NewContent.findById(req.params.id)
    res.send(result)
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});