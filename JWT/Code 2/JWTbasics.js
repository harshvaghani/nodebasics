//JSON Web Token is a standard use access tocken for an application
//A server generates a token that certifies the user identity

const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");


mongoose.connect('mongodb://localhost/Regestration');

let contentSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    rank: Number,
    date: { type: Date, default: Date.now },
    isActive: Boolean
})


let NewContent = mongoose.model('register', contentSchema, 'register');

//function to generate jwt token 
async function createToken() {
    const token = await jwt.sign({ _id: "631f5392e94012d9854a6717" }, "helloguysmynameisharshvaghani", { expiresIn: "2 minutes" });
    console.log(token);
    //expiresIn is used to set expiry date for users 
    //go to JWT.io


    //verify token with web server to get userdata : we will get userID 
    const userVar = await jwt.verify(token, "helloguysmynameisharshvaghani")
    console.log(userVar);
}
createToken();


app.listen(3000, () => {
    console.log("Server started on port 3000");
});