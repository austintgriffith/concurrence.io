const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log("Reading data...")
web3.eth.getAccounts().then((accounts)=>{
  console.log(accounts);
  fs.writeFileSync("accounts.json",JSON.stringify(accounts))
})
