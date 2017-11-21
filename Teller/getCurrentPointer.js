//
// usage: node contract getCurrentPointer Teller
//
module.exports = (contract,params,args)=>{
  contract.methods.currentPointer().call().then((currentPointer)=>{
    console.log("CURRENTPOINTER:"+currentPointer)
  })
}
