const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//
//usage: node contract deposit Payable null #INDEXOFSENDINGACCOUNT# #AMOUNTTOSEND#
//
//ex: node contract deposit Payable null 0 100000000000
//

module.exports = (contract,params,args)=>{
  console.log("== Testing Payable contract by sending "+args[6]+" from account index "+[args[5]])
  return contract.methods.deposit().send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice,
    value: args[6],
  })
}
