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
          let obj = JSON.parse(body)
          let ethPrice = Math.floor(obj[0].price_usd*1000);
           contract.methods.addResponse(events[e].returnValues._id,web3.utils.toHex(ethPrice)).send({
             from: args[5],
             gas: params.gas,
             gasPrice:params.gasPrice
           })
        })
      }
      console.log("GOT PAST EVENTS")
    })
}
