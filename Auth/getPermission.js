//
// usage: node contract getPermission Auth null ##ACOUNT##
//
module.exports = (contract,params,args)=>{
  contract.methods.permission(args[5]).call().then((permission)=>{
    console.log("PERMISSION:"+permission)
  })
}
