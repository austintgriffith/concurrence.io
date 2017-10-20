//
// usage: node contract eventsAddEntry LinkedList
//
module.exports = (contract,params,args)=>{
  contract.getPastEvents('AddEntry', {
      fromBlock: params.blockNumber,
      toBlock: 'latest'
  }, function(error, events){
    console.log(events);
  })
}
