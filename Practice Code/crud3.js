const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose
    .connect("mongodb://localhost/express-mongoose")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

//class
const User = mongoose.model('User', userSchema)


app.get("/users", (req, res) => {
    res.send("Hello World");
});

app.post("/users", async(req, res) => {
    console.log(req.body);

    if (req.body.mobile > 999999999) return res.status(400).send({ msg: "Mobile is not valid" })


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const result = await user.save();

    res.send(result);
});

app.patch("/users/:userId", async(req, res) => {
    console.log(req.params.userId);
    const result = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true })
    res.send({ result });
});

app.delete("/users/:userId", async(req, res) => {
    const result = await User.findByIdAndDelete(req.params.userId)

    res.send({ result });
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});