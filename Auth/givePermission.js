const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//
//usage: node contract givePermission Auth null #INDEXOFADMINACCOUNT# #ADDRESS# #PERMISSIONLEVEL#
//
//ex: node contract givePermission Auth null 0 0x530e0ECA3d70587D5d15CCDb1Af78fA317E39617 240
//

module.exports = (contract,params,args)=>{
  let permission = args[7]
  console.log("== Setting Permission for "+args[6]+" to "+permission+" with account "+params.accounts[args[5]])
  return contract.methods.setPermission(args[6],permission).send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
