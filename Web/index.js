const express = require('express')
const helmet = require('helmet')
const fs = require('fs')
const app = express()

app.use(helmet())

app.get('/', (req, res) => {
    console.log("/")
    res.end('Hello World')
});

app.get('/address', (req, res) => {
    console.log("/address")
    res.end(fs.readFileSync("../Main/Main.address").toString().trim())
});

app.get('/abi', (req, res) => {
    console.log("/abi")
    res.end(fs.readFileSync("../Main/Main.abi").toString().trim())
});

app.listen(80, () => console.log('[*] express is up and listing on 80'))
