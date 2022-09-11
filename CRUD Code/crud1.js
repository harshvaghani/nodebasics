const mongoose = require('mongoose');

//connection with Database 

mongoose.connect('mongodb://localhost/myclasses')
    .then(() => console.log('Database created'))
    .catch((err) => console.log('Database Error', err));

//make a schema object  

const classSchema = new mongoose.Schema({
    name: String,
    enrNum: Number,
    isActive: Boolean,
});

//make a class  

const Classroom = mongoose.model('classroom', classSchema)


async function classes() {
    const classroom = new Classroom({
        name: 'Meet',
        enrNum: 14,
        isActive: true,
    });
    const result = await classroom.save();

    console.log(result);
}


async function getClasses() {
    const myClass = await Classroom
        .find({ isActive: true, })
        .sort({ enrNum: 1 })
        .select({ name: 1, enrNum: 1 })

    console.log(myClass)
}
// getClasses();



async function updateClasses(id) {
    const myClass = await Classroom.findById(id)
    if (!myClass) return;
    myClass.set({
        name: 'Vaghani Brother',
    })
    const result = await myClass.save()
    console.log(result);
}

updateClasses('631cc01b072923321e8030f2')