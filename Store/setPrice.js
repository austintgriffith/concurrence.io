//
// usage: node contract setPrice Store null #SYBMOL# #PRICE#
//
// ex: node contract setPrice Store null BTC 5000000
//
let ACCOUNT_INDEX = 1
module.exports = (contract,params,args)=>{
  console.log("**== setting price for "+args[5]+" to "+args[6])
  return contract.methods.setPrice(params.web3.utils.fromAscii(args[5]),args[6]).send({
    from: params.accounts[ACCOUNT_INDEX],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
