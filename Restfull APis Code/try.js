const express = require('express');
const app = express();

let courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
]

//for getting all course on with get request

app.get('/api/courses/', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => parseInt(req.params.id) === c.id)
    if (course) {
        res.send(course);
    } else {
        res.status(404).send('The course with the given ID was not found')
    }
});
c



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port number ${port}`);
})