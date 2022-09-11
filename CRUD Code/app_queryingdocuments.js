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
    price: Number,
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
        name: 'Python',
        author: 'Harsh vaghani',
        tags: ['Angular', 'Frontend'],
        price: 20,
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}
//querying documents are used to operation with documents for example find a documet from a collection etc c c c 
//some of the querying comparision operatoes are:
//eq = equal, ne = not equal, gt = greater than, gte = greater than or equel to, lt = less than, lte = less than or equel to, in = in it, nin = not int
// gt 10 lt 20 

async function getCourses() {
    const courses = await Course
        // .find({ price: { $gt: 10, $lte: 20 } }) //operatin for greter  than 10 and less than 20 price
        .find({ price: { $in: [10, 15, 20] } }) //operation if it includes course of 10, 15, 20 
        .limit(10) //it returns how many document limit to return 
        .sort({ author: 1 })
        .select({ name: 1, price: 1 }) //used to show selected fields
        //perhaps we only want to show name of a course to a client 
    console.log(courses);
}

// async function getCourses() {
//     const courses = await Course
//         .find({ author: 'Harsh vaghani', isPublished: true })
//         .limit(10)
//         .sort({ author: 1 })
//         .select({ author: 1, tags: 1 })
//         //perhaps we only want to show name of a course to a client 
//     console.log(courses);
// }
getCourses();