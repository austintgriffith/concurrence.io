const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(" ### PERSONAL")
let count = 1



console.log("Reading data...")
const address = fs.readFileSync("Token/Token.address").toString().trim()
let abi = false
if(!address){
  console.log("Couldn't load Token/Token.address")
}else{
  abi = JSON.parse(fs.readFileSync("Token/Token.abi"));
  if(!abi){
    console.log("Couldn't load Token/Token.abi")
  }else{
    console.log("Loading...")
    web3.eth.getAccounts().then((accounts)=>{
      console.log("Loaded account "+accounts[0])
      let contract = new web3.eth.Contract(abi,address)
      console.log("Ready to interact...")
      let index = 0;//auth


        web3.eth.getAccounts().then((accounts)=>{
          console.log("Loaded accounts",accounts)
          for(let i=0;i<accounts.length;i++){
            contract.methods.balanceOf(accounts[i]).call().then((balanceOf)=>{
              console.log("The current token balance for ["+i+"]("+accounts[i]+") is ",balanceOf)
            })
          }
        })

      })
    }
  }
