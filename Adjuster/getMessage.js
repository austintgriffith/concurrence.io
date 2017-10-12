
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const ACCOUNT_INDEX = 1
//
// usage: node contract getMessage Inherit
//
// ex: node contract getMessage Inherit
//
module.exports = (contract,params,args)=>{
  contract.methods.message().call().then((message)=>{
    console.log("MESSAGE:"+message)
  })
}
