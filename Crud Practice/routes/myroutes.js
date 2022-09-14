// const express = require('express')
// const app = express();
const neData = require('../models/mydata')



module.exports = function(app) {
    const result = app.post('/mydata', async(req, res) => {
        const myData = new neData({
            name: req.body.name,
            amount: req.body.amount
        })
        const value = await myData.save();
        res.send(value)
    })


}