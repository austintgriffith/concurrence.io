const fs = require('fs');
const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
let gasPrice = fs.readFileSync("gasprice.int").toString().trim()
let xfergas = fs.readFileSync("xfergas.int").toString().trim()
let deploygas = fs.readFileSync("deploygas.int").toString().trim()
module.exports = {
  fs: fs,
  web3: web3,
  gasPrice: gasPrice,
  xfergas: xfergas,
  deploygas: deploygas,
  gaspricegwei: web3.utils.toWei(gasPrice,'gwei'),
  exitWith:(str)=>{
    console.log("ERROR: "+str)
    process.exit()
  }
}
