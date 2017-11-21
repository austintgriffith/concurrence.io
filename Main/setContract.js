//
// usage: node contract setContract Main null ##ACCOUNT_INDEX## ##CONTRACT## ##ADDRESS##
//
// ex: node contract setContract Main null 1 Auth 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//
module.exports = (contract,params,args)=>{
  console.log("**== setContract ["+args[6]+"] to "+args[7]+" with account "+params.accounts[args[5]])
  return contract.methods.setContract(params.web3.utils.fromAscii(args[6]),args[7]).send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
