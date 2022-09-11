// const express = require('express');
// const app = express();


// // app.get('/', (req, res) => {
// //     res.send('Hello World')
// // });

// // app.get('/api/courses', (req, res) => {
// //     res.send([1, 2, 3])
// // })

// app.listen(3000, () => console.log('Listening on Port 3000'));


const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
});


app.get('/harsh/', (req, res) => {
    res.send([1, 2, 3])
});

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
    //if we write /api/courses/1 we will get 1 as id for this param 
})

app.get('/api/post/:year/:month', (req, res) => {
    res.send(req.params);
    //just write /api/post/2002/02 in URL of a browser 
})

//query parameter in url
app.get('/api/post/:year/:month', (req, res) => {
    res.send(req.query);
    //write any query on url of a browser
    //http://localhost:3000/api/post/2018/12?sortBy=name
    //here we will get sortBy=name
})

//Environment variable: we use envirnonment variable because hosting environment automaticlly asigns paort number for the app
//we read port environment value using process object 
//PORT  
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`))