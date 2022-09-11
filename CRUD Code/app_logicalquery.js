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


//logical operator = or and
async function getTshirts() {
    const myTshirt = await Tshirt
        .find()
        // .or([{ name: 'fourth' }, { isAvailable: true }])
        .and([{ name: 'fourth' }, { isAvailable: true }])
        .limit(5)
        .sort({ price: 1 })
        .select({ price: 1, name: 1 })
    console.log(myTshirt);
}

getTshirts();