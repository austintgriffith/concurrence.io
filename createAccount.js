const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(" ### CREATE ACCOUNTS")
web3.eth.getAccounts().then((accounts)=>{
  console.log(accounts)
  web3.eth.personal.newAccount("",(a,b,c)=>{
    console.log(a,b,c)
  })
})
