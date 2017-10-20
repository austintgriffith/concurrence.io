//
// usage: node contract resetTotal LinkedList
//
// ex: node contract resetTotal LinkedList
//
let ACCOUNT_INDEX = 1
module.exports = (contract,params,args)=>{
  console.log("%*== resetTotal")
  return contract.methods.resetTotal().send({
    from: params.accounts[ACCOUNT_INDEX],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
