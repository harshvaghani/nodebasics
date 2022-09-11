const { date } = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/classroom')
    .then(() => console.log('connected'))
    .catch(() => console.log('isnt connnected'));

//1 - connnection, 2 - schema

const studentSchema = new mongoose.Schema({
    studentName: String,
    enroll: Number,
    course: String,
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

//make a class with mongoose model 
let Student = mongoose.model('student2', studentSchema)

async function allStudents() {
    let students = new Student({
        studentName: 'Harsh',
        enroll: 1212,
        course: 'React',
        isPublished: true
    })

    const result = await students.save();
    console.log(result);
}

allStudents();