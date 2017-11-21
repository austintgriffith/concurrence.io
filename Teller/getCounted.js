//
// usage: node contract getCounted Teller
//
module.exports = (contract,params,args)=>{
  contract.methods.counted().call().then((counted)=>{
    console.log("COUNTED:"+counted)
  })
}
