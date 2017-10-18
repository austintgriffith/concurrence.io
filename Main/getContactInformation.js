//
// usage: node contract getContactInformation Main
//
module.exports = (contract,params,args)=>{
  contract.methods.contactInformation().call().then((contact)=>{
    console.log("CONTACT INFORMATION:"+contact)
  })
}
