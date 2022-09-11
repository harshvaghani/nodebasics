const joi = require('joi');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Cound not connect to MongoDB', err));


//schema will define how a field:value in a mongodb document should be
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});


//after creating schema we will have to combine it into a model 

//classes, objects
//course, nodeCourse

//Creating a class of Course
const Course = mongoose.model('Course', courseSchema)


async function createCourse() {

    //Creating a course Object
    //courses collection and inside that we will have this document
    const course = new Course({
        name: 'Angular Course',
        author: 'Harsh vaghani',
        tags: ['Angular', 'Frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

createCourse();