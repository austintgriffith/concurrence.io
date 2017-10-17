//
// usage: node contract eventsSetContract Main
//
module.exports = (contract,params,args)=>{
  contract.getPastEvents('SetContract', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  }, function(error, events){
    console.log(events);
  })
}
