const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var request = require('request');

//node contract newEventsAddRequest Example null

module.exports = (contract,params,args)=>{
    console.log("Loading all requests from block "+params.blockNumber+" to latest")
    return contract.getPastEvents('AddResponse', {
        fromBlock: params.blockNumber,
        toBlock: 'latest'
    }, function(error, events){
      for(let e in events){
        //console.log("RESPONSE:",events[e].returnValues._result)
        try{
          let obj = JSON.parse(events[e].returnValues._result);
          console.log(obj[0].price_usd)
        }catch(e){console.log(e)}
      }
    })
}
