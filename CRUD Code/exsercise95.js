//get all the published backend courses, sort by their name,
//pick only name and author
//and display

const mongoose = require('mongoose');

//connect with a database
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Database created'))
    .catch((err) => console.log('Database Error', err));

//create mongoose.schema

const coursesSchema = new mongoose.Schema({
    tags: [String],
    date: { type: Date },
    name: String,
    author: String,
    isPublished: Boolean,
    __v: Number,
})

//create a class for a collection
const Courses = mongoose.model('course', coursesSchema)

// async function myCourses() {
//     const tshirt = new Tshirt({
//         name: 'Fourth',
//         price: 20,
//         isAvailable: false,
//     })

//     const result = await tshirt.save()
//     console.log(result);
// }


//finding a perticular document

async function getCourses() {
    return await Courses
        .find({ isPublished: true, tags: 'backend' })
        .limit(4)
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
}

async function run() {
    const result = await getCourses();
    console.log(result);
}

run()