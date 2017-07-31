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
      let index = 0;//auth

      contract.methods.name().call().then((name)=>{
        console.log("The current token name is ",name)
        contract.methods.owner().call().then((owner)=>{
          console.log("The current token owner is ",owner)
          contract.methods.balanceOf(owner).call().then((balanceOf)=>{
            console.log("The current token owner is ",balanceOf)

            let amount = 100
            console.log("approving "+amount+" from "+accounts[1]+" to move to "+accounts[0]+"...");
            contract.methods.approve(accounts[0],amount).send({
              from: accounts[1],
              gas: 100000,
              gasPrice:4000000000
            }).then((result,b,c)=>{
              console.log("APPROVE WORKED?",result,b,c)
            })

          })
        })

      //  index = 10;//requests
      //  contract.methods.getContractAddress(index).call().then((contractAddress)=>{
      //    console.log("The current contractAddress for ["+index+"] is ",contractAddress)
      //  })
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
