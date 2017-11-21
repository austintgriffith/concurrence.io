const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var request = require('request');

//node contract newEventsAddRequest Example null

module.exports = (contract,params,args)=>{
    console.log("Loading response for id "+args[5])
    return contract.methods.getResponse(args[5]).call().then((response)=>{
      console.log("response:",response)
    })
}
