const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());


let students = [
    { id: 1, name: 'Harsh' },
    { id: 2, name: 'Vaghani' }
]

app.get('/api/courses/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) res.status(404).send('There is no student');
    res.send(student);
    res.send()
})

app.post('/api/courses', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name
    }
    const { error } = validateStudent(req.body.name);
    if (error) {
        res.status(400).send(result.error.details[0].message); //only erorr message
        return;
    };
    students.push(student)
    res.send(student);

})

app.put('/api/courses/:id', (req, res) => {
    //look up the studnet 
    const student = students.find(c => c.id === parseInt(req.params.id))
    if (!student) res.status(404).send('The course does not exist');

    //validating body 
    const { error } = validateStudent(req.body);
    if (error) {
        res.status(400).send(result.error.details[0].message); //only erorr message
        return;
    };

    //update the course
    student.name = req.body.name;

    //send responce to the client
    res.send(student)
})





//function for validate name 

function validateStudent(name) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(name)
    return result;
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('On port number 3000'));