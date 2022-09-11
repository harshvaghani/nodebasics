//used to count criteria or values of given operator

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


//finding a perticular document with count function

async function getTshirts() {
    const myTshirt = await Tshirt
        .find({ price: { $in: [10, 15, 20] }, isAvailable: true })
        .skip()
        .limit(4)
        .sort({ price: 1 })
        .count()
    console.log(myTshirt);
}

getTshirts();