const lib = require("./lib.js")
console.log(" ### PERSONAL [# OF ACCOUNTS]")
//EXAMPLE USAGE: node personal 2
let count = 1
if(process.argv[2]) count = process.argv[2]
lib.web3.eth.getAccounts().then((accounts)=>{
  for(let i=0;i<count;i++){
    lib.web3.eth.getBalance(accounts[i]).then((balance)=>{
      console.log(" ######### "+i+" # "+accounts[i]+" "+balance)
      try{
        lib.web3.eth.personal.unlockAccount(accounts[i]).then((a,b,c)=>{
          console.log("unlocked "+i+": "+a)
        })
      }catch(e){console.log(e)}
    })
  }
})
