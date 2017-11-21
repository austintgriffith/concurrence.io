//
// usage: node contract getOwner Main
//
module.exports = (contract,params,args)=>{
  contract.methods.descendant().call().then((descendant)=>{
    console.log("DESCENDANT:"+descendant)
  })
}
