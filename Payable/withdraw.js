const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//
//usage: node contract withdraw Payable null #INDEXOFWITHDRAWINGACCOUNT# #AMOUNTTOWITHDRAW#
//
//ex: node contract withdraw Payable null 0 100000000000
//

module.exports = (contract,params,args)=>{
  console.log("== Testing Payable contract by withdrawing "+args[6]+" to account index "+[args[5]])
  return contract.methods.withdraw(args[6]).send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
