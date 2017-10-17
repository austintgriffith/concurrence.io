//
// usage: node contract eventsSetPermission Auth
//
module.exports = (contract,params,args)=>{
  contract.getPastEvents('SetPermission', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  }, function(error, events){
    console.log(events);
  })
}
