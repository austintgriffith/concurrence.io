//
// usage: node contract eventsAdjusted Adjuster
//
module.exports = (contract,params,args)=>{
  contract.getPastEvents('Adjusted', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  }, function(error, events){
    console.log(events);
  })
}
