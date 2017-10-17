//
// usage: node contract setPermission Auth null ##ACCOUNT_INDEX## ##ADDRESS## ##PERMISSION##
//
// ex: node contract setPermission Auth null 1 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 32
//
module.exports = (contract,params,args)=>{
  console.log("**== setPermission of account "+args[6]+" to "+args[7]+" with account "+params.accounts[args[5]])
  return contract.methods.setPermission(args[6],args[7]).send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
