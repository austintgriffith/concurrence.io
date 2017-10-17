//
// usage: node contract getOwner Main
//
module.exports = (contract,params,args)=>{
  contract.methods.owner().call().then((owner)=>{
    console.log("OWNER:"+owner)
  })
}
