const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

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
      contract.methods.permission(accounts[0]).call().then((permission)=>{
        console.log("The current permission[0] is ",permission)
        contract.methods.permission(accounts[1]).call().then((permission)=>{
          console.log("The current permission[1] is ",permission)
          contract.methods.owner().call().then((owner,b,c)=>{
            console.log("OWNER ",owner)
            if(owner==accounts[0]){
              console.log("(OWNER IS account 0)")
            }else if(owner==accounts[1]){
              console.log("(OWNER IS account 1)")
            }
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
