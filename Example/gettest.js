const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var request = require('request');

//node contract newEventsAddRequest Example null

module.exports = (contract,params,args)=>{
    console.log("Loading all requests from block "+params.blockNumber+" to latest")
    return contract.getPastEvents('Test', {
        fromBlock: params.blockNumber,
        toBlock: 'latest'
    }, function(error, events){


      for(let e in events){
        console.log("Checking:",events[e].returnValues._test)

      }

    })
}
