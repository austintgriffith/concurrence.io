const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var request = require('request');

console.log("Reading data...")
const address = fs.readFileSync(process.argv[2]+".address").toString().trim()
let abi = false
if(!address){
  console.log("Couldn't load "+process.argv[2]+".address")
}else{
  abi = JSON.parse(fs.readFileSync(process.argv[2]+".abi"));
  if(!abi){
    console.log("Couldn't load "+process.argv[2]+".abi")
  }else{
    console.log("Loading...")
    web3.eth.getAccounts().then((accounts)=>{
      console.log("Loaded account "+accounts[0])
      let contract = new web3.eth.Contract(abi,address)
      console.log("Ready to interact...")
      let index = 0;
      contract.methods.mainAddress().call().then((mainAddress)=>{
        console.log("The current mainAddress is ",mainAddress)
        contract.methods.getUrl("SOMERANDOMHASH").call().then((result)=>{
          console.log("The current getUrl is ",result)
          contract.methods.getResult("SOMERANDOMHASH").call().then((result)=>{
            console.log("The SOMERANDOMHASH getResult is ",result)
          })
        })
      })
    })
  }
}

/*
let deployed = test.deploy({
  data: bytecode,
  arguments: ["CONARG1"]
})
console.log("Deployed...")

console.log(deployed)
*/
