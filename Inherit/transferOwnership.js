// usage: node contract transferOwnership Inherit null #ACCOUNTINDEX# #ACCOUNTADDRESSOFNEWOWNER#
//
// ex: node contract transferOwnership Inherit null 1 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//
module.exports = (contract,params,args)=>{
  console.log("**== transferring ownership from "+params.accounts[args[5]]+" to "+args[6])
  return contract.methods.transferOwnership(args[6]).send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
