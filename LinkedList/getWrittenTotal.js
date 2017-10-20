//
// usage: node contract getWrittenTotal LinkedList
//
module.exports = (contract,params,args)=>{
  contract.methods.writtenTotal().call().then((writtenTotal)=>{
    console.log("WRITTENTOTAL:"+writtenTotal)
  })
}
