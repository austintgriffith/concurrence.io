
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const ACCOUNT_INDEX = 1

//
// usage: node contract wireupContract Main null #CONTRACTDIRNAME# #INDEXINUINARRAY#
//
// ex: node contract wireupContract Main null Auth 0
//

module.exports = (contract,params,args)=>{
  if(!args[5]||!args[6]){
    console.log("Please provide contract name and main address index to link address to main contract.")
  }else{
    let address = fs.readFileSync(args[5]+"/"+args[5]+".address").toString().trim();
    console.log("**== setting "+args[5]+"Address to "+address+" as index "+args[6]+" with account "+params.accounts[ACCOUNT_INDEX]+"...")
    return contract.methods.setContractAddress(args[6],address).send({
      from: params.accounts[ACCOUNT_INDEX],
      gas: params.gas,
      gasPrice:params.gasPrice
    })
  }
}
