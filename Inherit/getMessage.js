// usage: node contract getMessage Inherit
//
// ex: node contract getMessage Inherit
//
module.exports = (contract,params,args)=>{
  contract.methods.message().call().then((message)=>{
    console.log("MESSAGE:"+message)
  })
}
