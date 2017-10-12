
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//
// usage: node contract setMessage Inherit null #ACCOUNTINDEX# #MESSAGE#
//
// ex: node contract setMessage Inherit null 1 "HELLO WORLD"
//
module.exports = (contract,params,args)=>{

  console.log("**== setting message to "+args[6]+" with account "+params.accounts[args[5]])
  return contract.methods.setMessage(args[6]).send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })

}
