//
// usage: node contract setPermission Auth null ##ACCOUNT_INDEX## ##ADDRESS## ##PERMISSION## ##VALUE##
//
// ex: node contract setPermission Auth null 1 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX setPermission true
//
module.exports = (contract,params,args)=>{
  var value = (args[8]=='true')
  console.log("**== setPermission ["+args[7]+"] of account "+args[6]+" to "+value+" with account "+params.accounts[args[5]])
  return contract.methods.setPermission(args[6],params.web3.utils.fromAscii(args[7]),value).send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
