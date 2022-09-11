const express = require('express');
const app = express();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];
//all courses 
app.get('/api/courses', (req, res) => {
    res.send(courses)
});

//a single course 
app.get('/api/courses/:id', (req, res) => {
    //find method to find a single course in an array
    let course = courses.find(c => parseInt(req.params.id) === c.id);

    if (!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
    //here req.params.id will return a string value so we need to parse it into int value   
    res.send()
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port number ${port}`);
})