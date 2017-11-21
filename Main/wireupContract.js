
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

  let contractName
  let contractLocation
  let contractIndex

  if( typeof args[7] == "undefined"){
    contractName = args[5]
    contractLocation = args[5]
    contractIndex = args[6]
  }else{
    contractName = args[6]
    contractLocation = args[5]
    contractIndex = args[7]
  }

  if(!contractName||!contractIndex){
    console.log("Please provide contract name and index to link address to main contract.")
  }else{
    let address = fs.readFileSync(contractLocation+"/"+contractName+".address").toString().trim();
    console.log("**== setting "+contractName+"Address to "+address+" as index "+contractIndex+" with account "+params.accounts[ACCOUNT_INDEX]+"...")
    return contract.methods.setContractAddress(contractIndex,address).send({
      from: params.accounts[ACCOUNT_INDEX],
      gas: params.gas,
      gasPrice:params.gasPrice
    })
  }
}
