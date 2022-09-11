//we use joi module for validation
const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json()); //it will parse req.body.name

//we should use input validation for security validation

let courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
]

app.post('/api/courses', (req, res) => {
    //use npm joi module for complex input validation - https://www.npmjs.com/package/joi
    //with joi we first need to define a schema which will use to define objects means what properties and type that object has. Do we have email, do we have string, etc.

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body)
    console.log(result);

    if (result.error) {
        // if condition is true then use status code of 400
        // res.status(400).send(result.error); //for priting every erorr
        res.status(400).send(result.error.details[0].message); //only erorr message
        return;
    };

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port number ${port}`);
})