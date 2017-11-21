//
// usage: node contract setTotal LinkedList
//
// ex: node contract setTotal LinkedList
//
let ACCOUNT_INDEX = 1
module.exports = (contract,params,args)=>{
  console.log("%*== setTotal")
  return contract.methods.setTotal().send({
    from: params.accounts[ACCOUNT_INDEX],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
