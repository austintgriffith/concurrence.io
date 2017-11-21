//
// usage: node contract transferOwnership Main null ##ACCOUNT_INDEX## ##ACCOUNT##
//
// ex: node contract transferOwnership Main null 1 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//
module.exports = (contract,params,args)=>{
  console.log("**== transferOwnership to "+args[6]+" with account "+params.accounts[args[5]])
  return contract.methods.transferOwnership(args[6]).send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
