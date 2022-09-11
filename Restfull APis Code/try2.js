const express = require('express')
const app = express()

app.use(express.json())
    // app.use(express.urlencoded({ extended: true }))

app.post('/student-info', (req, res) => {
    let data = req.body;

    console.log('Name : ', data.name)
    console.log('Subject : ', data.subject)

    res.send()
})

const PORT = 8000
app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`)
});