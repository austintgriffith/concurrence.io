const express = require('express')
const helmet = require('helmet')
const fs = require('fs')
const app = express()

app.use(helmet())

app.get('/', (req, res) => {
    console.log("/")
    res.end('Hello World')
});

app.get('/address/:contract', (req, res) => {

    var contract = req.params.contract.replace(/[^a-z0-9/]/gi,'');
    console.log("/address",contract)
    res.end(fs.readFileSync("../"+contract+"/"+contract+".address").toString().trim())
});

app.get('/abi/:contract', (req, res) => {

    var contract = req.params.contract.replace(/[^a-z0-9/]/gi,'');
    console.log("/abi",contract)
    res.end(fs.readFileSync("../"+contract+"/"+contract+".abi").toString().trim())
});


app.get('/combineraddress/:contract', (req, res) => {

    var contract = req.params.contract.replace(/[^a-z0-9/]/gi,'');
    console.log("/address",contract)
    res.end(fs.readFileSync("../Combiner/"+contract+"/Combiner.address").toString().trim())
});

app.get('/combinerabi/:contract', (req, res) => {

    var contract = req.params.contract.replace(/[^a-z0-9/]/gi,'');
    console.log("/abi",contract)
    res.end(fs.readFileSync("../Combiner/"+contract+"/Combiner.abi").toString().trim())
});

app.listen(80, () => console.log('[*] express is up and listing on 80'))
