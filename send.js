const lib = require("./lib.js")
console.log(" ### SEND (AMOUNT) (FROM) (TO)")
//EXAMPLE USAGE: node send 0.1 0x14f990ce8f5124f273bdc19b8a39769eab8736a3 0x6230323b97fb5504e2d352d5dd07c798a8ecbe91
if(process.argv[2]){amount=process.argv[2]}else{lib.exitWith("Please provide an amount.")}
if(process.argv[3]){from=process.argv[3]}else{lib.exitWith("Please provide the 'from' address.")}
if(process.argv[4]){to=process.argv[4]}else{lib.exitWith("Please provide the 'to' address.")}
let params = {
  from: from,
  to: to,
  value: lib.web3.utils.toWei(amount, "ether"),
  gas: lib.xfergas,
  gasPrice: lib.gaspricegwei
}
console.log(params)
lib.web3.eth.sendTransaction(params,(error,transactionHash)=>{
  console.log(error,transactionHash)
  setInterval(()=>{
    lib.web3.eth.getTransactionReceipt(transactionHash,(error,result)=>{
      if(result&&result.to&&result.from){
        console.log(result)
        process.exit(0);
      }else{
        process.stdout.write(".")
      }
    })
  },10000)
})
