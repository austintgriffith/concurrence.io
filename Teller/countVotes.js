//
// usage: node contract countVotes Teller null ##ADDRESS##
//
// ex: node contract countVotes Teller null 0x8A07A9381b6c42c5e3E7a40Feccc9ba9c920c019
//
let ACCOUNT_INDEX = 1
module.exports = (contract,params,args)=>{
  console.log("%*== countVotes")
  return contract.methods.countVotes(args[5]).send({
    from: params.accounts[ACCOUNT_INDEX],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
