const express = require("express");
const Joi = require("joi");
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const validator = require('./validate2')
const morgan = require('morgan');
const { number } = require("joi");
app.use(morgan('tiny'));


//Connect to a server 
mongoose.connect('mongodb://localhost/content')
    .then(() => console.log('Database created'))
    .catch((err) => console.log('Database Error', err));

//make a schema

const sportsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
    },
    category: {
        type: String,
        enum: ['first', 'second'],
    },
    about: mongoose.Schema.Types.Mixed,
    isActive: Boolean,
    //conditional validator for suppose we only want to use rank if isActive is true
    rank: {
        type: Number,
        required: function() { return this.isActive }
    },

    tags: {
        type: Array,
        validate: function(v) {
            return v && v.length > 0;
        },
        messsage: 'It should have atleast 1 tag'
    }
})

//create a class with model 
const Content = mongoose.model('Content', sportsSchema);

app.post('/content', async(req, res) => {


    // const result2 = validator(req.body);
    // if (result2.error) {
    //     res.status(400).send(result2.error.details[0].message); //only erorr messageA
    //     return;
    // }

    const content = new Content({
        name: req.body.name,
        about: req.body.about,
        isActive: req.body.isActive,
        rank: req.body.rank,
        category: req.body.category,
        tags: req.body.tags,
    })

    try {
        //built in validation with content 
        // const result = await content.validate() //It will return path name is required 
        //however we can't use if else w ith this result because it returns a promise 
        //to use if else condition with result use callback
        const result = await content.save();
        res.send(result)
    } catch (error) {
        //we can get errors of each req.body values for examples  error.errors.tags or categories  
        for (field in error.errors) {
            res.send(error.errors[field].message);
        }
    }

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