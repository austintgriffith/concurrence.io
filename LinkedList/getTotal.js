//
// usage: node contract getTotal LinkedList
//
module.exports = (contract,params,args)=>{
  contract.methods.total().call().then((total)=>{
    console.log("TOTAL:"+total)
  })
}
