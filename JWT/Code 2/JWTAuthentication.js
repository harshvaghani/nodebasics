const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");

const post = [
    { username: 'Harsh', title: 'post1' }, { username: 'vaghani', title: 'post2' }
]

app.get('/posts', (req, res) => {
    res.send(post.filter(post => post.username == req.user.name))
})


app.post('/login', (req, res) => {
    //Authenticate User 
    const username = req.body.username;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESSTOKEN__SECRET)
    res.send({ accessToken: accessToken })
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //here we have splited bearer and [1] is a token portion and || moreover if we have a authheader then return authHeader.split 
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESSTOKEN__SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next(); //middleware next 
    });
    //Bearer -- Token 
}

app.listen(3000, () => {
    console.log("Server started on port 3000");
});