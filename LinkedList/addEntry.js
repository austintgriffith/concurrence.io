//
// usage: node contract addEntry LinkedList null ##NUMBER## ##NAME##
//
// ex: node contract addEntry LinkedList null 42 "Jimmy"
//
let ACCOUNT_INDEX = 1
module.exports = (contract,params,args)=>{
  console.log("%*== addEntry: ",args[5],args[6])
  return contract.methods.addEntry(args[5],args[6]).send({
    from: params.accounts[ACCOUNT_INDEX],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
