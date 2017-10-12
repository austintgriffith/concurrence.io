//
// usage: node contract adjustTo Adjuster null #CONTRACTADDRESS# #TARGET# #ACCOUNTINDEX#
//
// ex: node contract adjustTo Adjuster null 0xB216C56621Bc83EFcDd0F10d2De3049Cee97eFB4 128 1
//

module.exports = (contract,params,args)=>{
  console.log("**== adjusting Simple contract at "+args[5]+" to "+args[6]+" using account "+params.accounts[args[7]])
  return contract.methods.adjustTo(args[5],args[6]).send({
    from: params.accounts[args[7]],
    gas: params.gas,
    gasPrice:params.gasPrice
  })
}
