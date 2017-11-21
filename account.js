const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log("Reading data...")
web3.eth.getAccounts().then((accounts)=>{
  console.log("Loaded account "+accounts[0])
  web3.eth.getBalance(accounts[0]).then((wei)=>{
    console.log(web3.utils.fromWei(wei,'ether'))
  })
})
