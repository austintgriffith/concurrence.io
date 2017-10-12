//
// usage: node contract getCount Simple
//
module.exports = (contract,params,args)=>{
  contract.methods.count().call().then((count)=>{
    console.log("COUNT:"+count)
  })
}
