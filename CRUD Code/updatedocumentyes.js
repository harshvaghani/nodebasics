const mongoose = require('mongoose');

//connect with a database
mongoose.connect('mongodb://localhost/tshirt')
    .then(() => console.log('Database created'))
    .catch((err) => console.log('Database Error', err));

//create mongoose.schema

const tshirtSchema = new mongoose.Schema({
    name: String,
    price: Number,
    isAvailable: Boolean,
    date: { type: Date, default: Date.now }
})

//create a class for a collection
const Tshirt = mongoose.model('tshirt', tshirtSchema)

async function tshirts() {
    const tshirt = new Tshirt({
        name: 'Fourth',
        price: 20,
        isAvailable: false,
    })

    const result = await tshirt.save()
    console.log(result);
}


//finding a perticular document

async function getTshirts() {
    const myTshirt = await Tshirt
        .find({ price: { $in: [10, 15, 20] }, isAvailable: true })
        .limit(4)
        .sort({ price: 1 })
        .select({ price: 1, name: 1 })
    console.log(myTshirt);
}

// getTshirts();


//updeting documents in collections

//approach1 : Query first
//findById()
//modify it's properties
//save()
//2nd approach: update first and directly 

//First approach: 
async function updateCourse(id) {
    const find = await Tshirt.findById(id);

    if (!find) return;
    find.set({
        name: 'Harsh Maheshbhai',
    })

    const result = await find.save();
    console.log(result);
}

updateCourse('631c91adf1f0ca0f09a7b5ec');