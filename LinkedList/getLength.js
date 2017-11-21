//
// usage: node contract getLength LinkedList
//
module.exports = (contract,params,args)=>{
  contract.methods.length().call().then((length)=>{
    console.log("LENGTH:"+length)
  })
}
