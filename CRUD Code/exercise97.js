//get all the published frontend and backend course 
//sort them by their price in decending order 
//pick only their name and author and display them
const mongoose = require('mongoose');

//connection with database 

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Database created'))
    .catch((err) => console.log('Database Error', err));

//database schema

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: { type: Date },
    name: String,
    author: String,
    price: Number,
    isPublished: Boolean,
    __v: Number,
});

//create a class 

const myCourses = mongoose.model('course', courseSchema);


//price greater than 15
async function course() {
    return await myCourses
        .find({ isPublished: true })
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
        // .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } }) 
        .sort({ price: 1 })
        .select({ name: 1, author: 1, price: 1, tags: 1 });
}

async function run() {
    const result = await course()
    console.log(result);
}

run()