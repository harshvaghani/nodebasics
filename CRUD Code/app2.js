const { string } = require('joi');
const mongoose = require('mongoose');

//you have to connect with a database 
//make schma 
//class
//object - object name will be document and it's value will be collection with ID
//make result with save() await and async

mongoose.connect('mongodb://localhost/classroom')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Erorr', err));

const classSchema = new mongoose.Schema({
    studentName: String,
    subject: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})



//after creating a scheme we will have to add it in a model

//class > object

//Creating a class 
const MyCourse = mongoose.model('class', classSchema);

//Creatign an object

async function createCourse() {
    const myCourse = new MyCourse({
        studentName: 'Harsh Vaghani',
        subject: 'React',
        tags: ['React', 'Front-end '],
        isPublished: true
    })


    const result = await myCourse.save();
    console.log(result);
}

createCourse();