const mongoose = require('mongoose');

//Creating a database 
mongoose.connect('mongodb://localhost/mystore')
    .then(() => console.log('Database created'))
    .catch((err) => console.log('Database Error', err));

//Creating a schema object for document format

let storeSchema = new mongoose.Schema({
    name: String,
    price: Number,
    isActive: Boolean,
    date: { type: Date, default: Date.now }
})

//Creating a class for making collection in our database
let StoreClass = mongoose.model('mystore', storeSchema)

//Creating a object with class

async function myStore() {
    let storeObject = new StoreClass({
        name: 'Fourth',
        price: 18,
        isActive: true,
    });
    const result = await storeObject.save()
    console.log(result);
}
// myStore()

async function findProduct() {
    const find = await StoreClass
        .find({ price: { $gt: 12 } })
        .sort({ price: 1 })
        .select({ name: 1, price: 1 })
    console.log(find);
}
// findProduct()



//updating a product
async function update(id) {
    const find = await StoreClass.updateOne({ _id: id }, {
        $set: {
            name: 'Harsh Vaghani',
            isActive: true,
        }
    })
    console.log(find);
}
// update('631d4bf5bb382d11fc8f117d')


async function removeCourse(id) {
    // const result = await Tshirt.deleteOne({ _id: id })
    const result = await StoreClass.deleteOne({ _id: id })
    console.log(result);
}


removeCourse('631d4bf5bb382d11fc8f117d')