//
// usage: node contract minePrice Store null #SYMBOL#
//
// ex: node contract minePrice Store null BTC,ETH,XRP,BCH,LTC
//
const SHIFT = 1000000000000//shift price from float to uint
const Request = require('request');
let ACCOUNT_INDEX = 1
module.exports = (contract,params,args)=>{
  console.log("**== loading source from contract...")
  contract.methods.source().call().then((source)=>{
    console.log("** Calling price source url:"+source)
    let symbols = args[5].split(",")
    console.log("** Symbols:",symbols)
    Request(source,(error, response, body)=>{
      if(error){console.log(error)}else{
        try{
          let data = JSON.parse(body)
          for(let i in data){
            if(symbols.includes(data[i].symbol)){
              let shiftedPrice = data[i].price_usd*SHIFT;
              console.log("**== setting price for "+data[i].symbol+" to "+shiftedPrice)
              contract.methods.setPrice(params.web3.utils.fromAscii(data[i].symbol),shiftedPrice).send({
                from: params.accounts[ACCOUNT_INDEX],
                gas: params.gas,
                gasPrice:params.gasPrice
              }).then((tx)=>{console.log(data[i].symbol,tx.transactionHash)})
            }
          }
        }catch(e){console.log(e)}
      }
    })
  })
}
