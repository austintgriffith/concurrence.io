//
// usage: node contract getState EthVsBch
//
module.exports = (contract,params,args)=>{
  contract.methods.whoIsWinning().call().then((obj)=>{
    console.log("CURRENT WINNER:",obj)
  })
}
