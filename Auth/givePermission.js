const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

module.exports = (contract,params)=>{
  let permission = 240
  console.log("== Setting Permission for "+params.accounts[1]+" to "+permission+" with account "+params.accounts[0])
  return contract.methods.setPermission(params.accounts[1],permission).send({
    from: params.accounts[0],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
