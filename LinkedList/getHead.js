//
// usage: node contract getHead LinkedList
//
module.exports = (contract,params,args)=>{
  contract.methods.head().call().then((head)=>{
    console.log("HEAD:"+head)
  })
}
