//
// usage: node contract getPermission Auth null ##ACOUNT## ##PERMISSION##
//
module.exports = (contract,params,args)=>{
  contract.methods.permission(args[5],params.web3.utils.fromAscii(args[6])).call().then((permission)=>{
    console.log("PERMISSION ["+args[6]+"]: "+permission)
  })
}
