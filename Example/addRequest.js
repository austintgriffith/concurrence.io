
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const ACCOUNT_INDEX = 1

//
// usage: node contract addRequest Example null #FROMADDRESS# #URL#
//
// ex: node contract addRequest Example null 0xa4304371200112183436a7d1a78f8b4d53136136 https://ifconfig.co/json
//
//node contract addRequest Example null 0xa4304371200112183436a7d1a78f8b4d53136136 "https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD,BTC"

module.exports = (contract,params,args)=>{
    return contract.methods.addRequest(web3.utils.sha3(args[5]+args[6]),args[6]).send({
      from: args[5],
      gas: params.gas,
      gasPrice:params.gasPrice
    })

}
