//
// usage: node contract getWinningName Teller
//
module.exports = (contract,params,args)=>{
  contract.methods.winningName().call().then((winningName)=>{
    console.log("WINNINGNAME:"+params.web3.utils.toAscii(winningName))
  })
}
