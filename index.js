const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3010
const productJson = require("./products.json")
let cartJson = require("./cartlist.json")

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json())

app.get('/product', (req, res) => res.send(productJson))

app.post('/addtocart', (req, res) => {
    if (req.body.action === "add") {
        cartJson = { ...cartJson, ...req.body.args }
    }else if(req.body.action === "delete"){
        let deletableKey =  Object.keys(req.body.args)[0]
        delete cartJson[deletableKey]
    }
    res.send(cartJson)
})

app.get('/addtocart', (req, res) => {
    res.send(cartJson)
})

app.listen(port)