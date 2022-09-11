//we use post method to create a course using node jsconst express  
const express = require('express');
const app = express();
app.use(express.json()); //it will parse req.body.name 

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];
//all courses 
app.get('/api/courses', (req, res) => {
    res.send(courses)
});

//a single course for get method  
app.get('/api/courses/:id', (req, res) => {
    //find method to find a single course in an array
    let course = courses.find(c => parseInt(req.params.id) === c.id);

    if (!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
    //here req.params.id will return a string value so we need to parse it into int value   
    res.send()
});

//post method - we use it to upload a course as post method
app.post('/api/courses', (req, res) => {
    //now we will create a course object which will be added in courses array
    const course = {
        id: courses.length + 1,
        name: req.body.name, //we need to read name from the body of the request 
    }
    courses.push(course);
    res.send(course);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port number ${port}`);
})