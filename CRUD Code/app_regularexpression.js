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


//Regular Expressions 

async function getTshirts() {
    const myTshirt = await Tshirt
        //name starts with F alphbet 
        .find({ name: /^F/ }) //starts with F

    //ends with T alphabet and name 
    .find({ name: /t$/i }) //ends with T/insenstive letter 
        // .find({ name: /.*harsh.*/ }) //what if a value countains any given charecter or work in a given value = 0 or more char before word 0 or more char after/i insensitive letter 
        .limit(4)
        .sort({ price: 1 })
        .select({ price: 1, name: 1 })
    console.log(myTshirt);
}

getTshirts();