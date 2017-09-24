const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var request = require('request');

//node contract newEventsAddRequest Example null

module.exports = (contract,params,args)=>{
    console.log("Loading all requests from block "+params.blockNumber+" to latest")
    return contract.getPastEvents('AddRequest', {
        fromBlock: params.blockNumber,
        toBlock: 'latest'
    }, function(error, events){


      for(let e in events){
        console.log("Checking id:",events[e].returnValues._id)
        console.log("MINING ",events[e].returnValues._url)
        request(events[e].returnValues._url, function (error, response, body) {
           console.log(body)
           contract.methods.addResponse(events[e].returnValues._id,body).send({
             from: args[5],
             gas: params.gas,
             gasPrice:params.gasPrice
           })
        })
      }
      console.log("GOT PAST EVENTS")
    })
}
