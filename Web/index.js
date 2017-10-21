const express = require('express')
const helmet = require('helmet')
const fs = require('fs')
const md5 = require('md5')
const sha3 = require('sha3')
const app = express()

app.use(helmet())


app.get('/', (req, res) => {
    let stamp = Date.now()
    let seed = Math.random()
    var sha = new sha3.SHA3Hash(224);
    sha.update(""+stamp + seed);
    let hash = sha.digest('hex');
  //  let ip =
    console.log("/"+stamp,seed,hash,req.connection.remoteAddress, req.connection.remotePort, req.connection.localAddress, req.connection.localPort,req.headers['user-agent'])
    res.end(hash)
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

app.get('/combiner/source/:contract', (req, res) => {

    var contract = req.params.contract.replace(/[^a-z0-9/]/gi,'');
    console.log("/source",contract)
    res.end(fs.readFileSync("../Combiner/"+contract+"/Combiner.sol").toString().trim())
});

app.get('/combiner/address/:contract', (req, res) => {

    var contract = req.params.contract.replace(/[^a-z0-9/]/gi,'');
    console.log("/address",contract)
    res.end(fs.readFileSync("../Combiner/"+contract+"/Combiner.address").toString().trim())
});

app.get('/combiner/abi/:contract', (req, res) => {

    var contract = req.params.contract.replace(/[^a-z0-9/]/gi,'');
    console.log("/abi",contract)
    res.end(fs.readFileSync("../Combiner/"+contract+"/Combiner.abi").toString().trim())
});

app.get('/combinerLookup/:address', (req, res) => {
    const DEBUGCOMBINERLOOKUP = false
    const combinersAt = "../Combiner";
    var cleanAddress = req.params.address.replace(/[^a-z0-9/]/gi,'');
    console.log("Combiner Lookup",cleanAddress)
    fs.readdir(combinersAt, function( err, files ) {
          let found = false
        if( err ) {
            if(DEBUGCOMBINERLOOKUP) console.error( "Could not list the directory "+combinersAt, err );
        } else{
          files.forEach( function( file, index ) {
            if(fs.readFileSync("../Combiner/"+file+"/Combiner.address").toString().trim()==cleanAddress){
              if(DEBUGCOMBINERLOOKUP) console.log("FOUND "+file+" is "+cleanAddress)
              found=file
            }
          })
        }
        if(found){
          console.log(found)
          res.end(found)
        }else{
          res.end(401)
        }
      })
});

app.listen(80, () => console.log('[*] express is up and listing on 80'))
