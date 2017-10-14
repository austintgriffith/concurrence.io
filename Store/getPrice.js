//
// usage: node contract getPrice Store null BTC
//
const SHIFT = 1000000000000//shift price from float to uint
module.exports = (contract,params,args)=>{
  contract.methods.getPrice(params.web3.utils.fromAscii(args[5])).call().then((price)=>{
    console.log("PRICE OF ["+args[5]+"]: $"+(price/SHIFT)+" USD")
  })
}
