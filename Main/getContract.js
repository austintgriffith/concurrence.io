//
// usage: node contract getContract Main null ##CONTRACT##
//
module.exports = (contract,params,args)=>{
  contract.methods.getContract(params.web3.utils.fromAscii(args[5])).call().then((contract)=>{
    console.log("CONTRACT ["+args[5]+"]:"+contract)
  })
}
