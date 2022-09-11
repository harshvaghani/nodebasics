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
    if (!student) res.status(400).send('could not find a student')
    res.send(student)
})

app.post('/api/courses', (req, res) => {
    //have to make a student 
    //push into the studnets array 
    const student = {
        id: students.length + 1,
        name: req.body.name,
        myClass: req.body.myClass
    }

    //validation 
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        myClass: Joi.number().required(),
    })

    const result = schema.validate(req.body)
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message); //only erorr message
        return;
    }

    students.push(student);
    res.send(student);
});

//put method

app.put('/api/courses/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id))
    if (!student) res.status(400).send('could not find a student')

    student.name = req.body.name;
    student.myClass = req.body.myClass;
    res.send(student)
});

app.delete('/api/courses/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id))
    if (!student) res.status(400).send('could not find a student')

    const index = students.indexOf(student)
    const result = students.splice(index, 1)

    res.send(result)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listenening on the port number ${port}`);
})