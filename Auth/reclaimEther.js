//
// usage: node contract reclaimEther Auth null ##ACCOUNT_INDEX##
//
// ex: node contract reclaimEther Auth null 1
//
module.exports = (contract,params,args)=>{
  console.log("**== reclaimEther with account "+params.accounts[args[5]])
  return contract.methods.reclaimEther().send({
    from: params.accounts[args[5]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
