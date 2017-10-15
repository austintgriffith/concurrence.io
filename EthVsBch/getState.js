//
// usage: node contract getState EthVsBch
//
module.exports = (contract,params,args)=>{
  contract.methods.source().call().then((source)=>{
    console.log("SOURCE:"+source)
    contract.methods.whoIsWinning().call().then((obj)=>{
      console.log("CURRENT WINNER:",obj)
    })
  })
}
