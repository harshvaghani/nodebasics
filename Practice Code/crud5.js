const mongoose = require('mongoose');

//Connect to a server 
mongoose.connect('mongodb://localhost/content')
    .then(() => console.log('Database created'))
    .catch((err) => console.log('Database Error', err));

//make a schema

const sportsSchema = new mongoose.Schema({
    name: String,
    about: mongoose.Schema.Types.Mixed,
    isActive: Boolean,
    rank: Number,
})

//create a class with model 
const Content = mongoose.model('Content', sportsSchema);

//Creating an object with class content

// async function run() {
//     const content = new Content({
//         name: 'Root3',
//         about: [
//             [12], { last: '1123' }, 'Root'
//         ],
//         isActive: true,
//         rank: 19,
//     })
//     const result = await content.save()
//     console.log(result);
// }
// // run()



// async function update(id) {
//     const result = await Content.updateOne({ _id: id }, {
//         $set: {
//             name: 'Harsh Vaghani'
//         }
//     })
//     console.log(result);
// }
// // update('631dc6fc8a8f8441ff495dc1')

// //or another method
// // async function updateID(id) {
// //     const result = await Content.findByIdAndUpdate({ _id: id }, {
// //         $set: {
// //             name: 'Root7',
// //         }
// //     })
// //     console.log(result);
// // }


// // updateID('631dc8fd5f1e6fa0040552a5')


// async function deleteDoc(id) {
//     const result = await Content.findByIdAndDelete({ _id: id })
//     console.log(result);
// }
// // deleteDoc('631dc8fd5f1e6fa0040552a5')




// //querying documents

// async function found() {
//     const result = await Content
//         .find()
//         .and([{ isActive: true }, { ranks: { $gt: 12 } }])
//         .select({ name: 1, rank: 1 })
//     console.log(result);
// }
// found()