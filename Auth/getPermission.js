const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


//
// usage: node getPermission Auth 0x530e0ECA3d70587D5d15CCDb1Af78fA317E39617
//

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
      console.log("Loading Contract...")

      let contract = new web3.eth.Contract(abi,address)
      let account = process.argv[3]
      console.log("Getting permission for "+account)
      contract.methods.permission(account).call().then((permission)=>{
        console.log(permission)
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
