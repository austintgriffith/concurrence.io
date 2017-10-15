//
// usage: node contract getLastUpdate Store
//
module.exports = (contract,params,args)=>{
  contract.methods.lastUpdate().call().then((lastUpdate)=>{
    console.log("LastUpdate:"+lastUpdate)
  })
}
