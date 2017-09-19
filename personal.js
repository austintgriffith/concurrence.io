const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(" ### PERSONAL")
let count = 1
if(process.argv[2]) count = process.argv[2]


web3.eth.getAccounts().then((accounts)=>{
  for(let i=0;i<count;i++){
    web3.eth.getBalance(accounts[i]).then((balance)=>{
      console.log(" ######### "+i+" # "+accounts[i]+" "+balance)
      try{
        web3.eth.personal.unlockAccount(accounts[i]).then((a,b,c)=>{
          console.log("unlocked "+i+": "+a)

        })
      }catch(e){console.log(e)}

    })
  }
})
