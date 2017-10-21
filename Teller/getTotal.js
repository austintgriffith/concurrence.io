//
// usage: node contract getTotal Teller null ##NAME##
//
module.exports = (contract,params,args)=>{
  contract.methods.totals(params.web3.utils.fromAscii(args[5])).call().then((total)=>{
    console.log("TOTAL ["+args[5]+"]:"+total)
  })
}
