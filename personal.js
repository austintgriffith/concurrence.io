const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(" ### PERSONAL")
web3.eth.getAccounts().then((accounts)=>{
  web3.eth.getBalance(accounts[0]).then((balance)=>{
    console.log(" ########## "+accounts[0]+" "+balance)
    web3.eth.personal.unlockAccount(accounts[0]).then((a,b,c)=>{
      console.log("unlocked: "+a)
      web3.eth.getBalance(accounts[1]).then((balance)=>{
        console.log(" ########## "+accounts[1]+" "+balance)
        web3.eth.personal.unlockAccount(accounts[1]).then((a,b,c)=>{
          console.log("unlocked: "+a)
        })
      })
    })
  })
})
