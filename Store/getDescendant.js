//
// usage: node contract getDescendant Store previous
//
module.exports = (contract,params,args)=>{
  contract.methods.descendant().call().then((descendant)=>{
    console.log("DESCENDANT:"+descendant)
  })
}
