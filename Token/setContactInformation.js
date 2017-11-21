//
// usage: node contract setContactInformation Main null ##ACCOUNT_INDEX ##CONTACTSTRING##
//
// ex: node contract setContactInformation Main null 1 "Contact Information"
//
module.exports = (contract,params,args)=>{
  console.log("**== setContactInformation to "+args[6]+" with account "+params.accounts[args[5]])
  return contract.methods.setContactInformation(args[6]).send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
