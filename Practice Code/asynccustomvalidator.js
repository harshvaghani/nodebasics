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
        // match: //with using match we can use regular expression
    },
    category: {
        type: String,
        enum: ['first', 'second'] //enum means a given value should have one of the enum value
    },
    about: mongoose.Schema.Types.Mixed,
    isActive: Boolean,
    //conditional validator for suppose we only want to use rank if isActive is true
    rank: {
        type: Number,
        required: function() { return this.isActive }
    },

    //sometimes a logic may include reading data from database or to listen from http server 
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                //Some Async work 
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result)
                }, 1000);
                //this property will be valid only if v.lenght >0 //we have used v here because we don't want to value of this to be null
            },
            message: 'It should have atleast 1 tag'
        }
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
        //however we can't use if else with this result because it returns a promise 
        //to use if else condition with result use callback
        const result = await content.save();
        res.send(result)
    } catch (error) {
        res.send(error.message);
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