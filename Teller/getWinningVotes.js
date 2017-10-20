//
// usage: node contract getWinningVotes Teller
//
module.exports = (contract,params,args)=>{
  contract.methods.winningVotes().call().then((winningVotes)=>{
    console.log("WINNINGVOTES:"+winningVotes)
  })
}
