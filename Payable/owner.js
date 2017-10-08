const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//
//usage: node contract owner Payable
//
//ex: node contract owner Payable
//

module.exports = (contract,params,args)=>{
  console.log("== loading owner from contract ")
  contract.methods.owner().call((err,owner)=>{
    if(err){
      console.log(err)
    }else{
      console.log("OWNER:"+owner)
    }
  })
}
