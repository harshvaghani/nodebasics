const mongoose = require("mongoose");

const myData = mongoose.model(
    "myContent",
    new mongoose.Schema({
        name: String,
        amount: Number,
    })
);


// module.exports = myData;
module.exports = myData;