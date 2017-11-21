//
// usage: node contract getState Store
//
module.exports = (contract,params,args)=>{
  contract.methods.owner().call().then((owner)=>{
    console.log("OWNER:"+owner)
    contract.methods.source().call().then((source)=>{
      console.log("SOURCE:"+source)
      contract.methods.descendant().call().then((descendant)=>{
        console.log("DESCENDANT:"+descendant)
      })
    })
  })
}
