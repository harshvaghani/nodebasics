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
    students.push(student)
    res.send(student);
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('On port number 3000'));