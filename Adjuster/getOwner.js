//
// usage: node contract getOwner Adjuster
//
module.exports = (contract,params,args)=>{
  contract.methods.owner().call().then((owner)=>{
    console.log("OWNER:"+owner)
  })
}
