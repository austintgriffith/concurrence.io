//
// usage: node contract reclaimEther Main null ##ACCOUNT_INDEX##
//
// ex: node contract reclaimEther Main null 1
//
module.exports = (contract,params,args)=>{
  console.log("**== reclaimEther with account "+params.accounts[args[5]])
  return contract.methods.reclaimEther().send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
