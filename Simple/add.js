//
// usage: node contract add Simple null #AMOUNT#
//
// ex: node contract add Simple null 1
//
module.exports = (contract,params,args)=>{
  console.log("**== adding "+args[5])
  return contract.methods.add(args[5]).send({
    from: params.accounts[0],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
