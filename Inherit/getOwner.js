// usage: node contract getOwner Inherit
//
// ex: node contract getOwner Inherit
//
module.exports = (contract,params,args)=>{
  contract.methods.owner().call().then((owner)=>{
    console.log("OWNER:"+owner)
  })
}
