const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());


let students = [
    { id: 1, name: 'Harsh' },
    { id: 2, name: 'Vaghani' }
]


app.get('/api/courses/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id))
    if (!student) res.status(400).send('Did not find ID')
    res.send(student)
})

app.post('/api/courses', (req, res) => {

    const student = {
        id: students.length + 1,
        name: req.body.name,
        class: req.body.class
    }

    //validating an input 
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        class: Joi.number().required(),
    })

    const result = schema.validate(req.body);
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message); //only erorr message
        return;
    }

    //upload student 
    students.push(student)
    res.send(student);
})

app.put('/api/courses/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id))
    if (!student) res.status(400).send('Did not find ID')

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        class: Joi.number().required(),
    })

    const result = schema.validate(req.body);
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message); //only erorr message
        return;
    }

    student.name = req.body.name;
    student.class = req.body.class;

    res.send(student)
})


app.delete('/api/courses/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) res.status(400).send('Did not find ID');

    //find index of student in students
    const index = students.indexOf(student)
    students.splice(index, 1)

    res.send(student);

})



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listenening on the port number ${port}`);
})