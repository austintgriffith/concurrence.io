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
      console.log("interact...")
      contract.methods.setPermission('0xbea3ee94e482d5b3081289faea5b93b082455684',201).send({
        from: '0xe5A055CFe57287fEB89bbAE79538a3be3A06f62b',
        gas: 100000,
        gasPrice:4000000000
      }).then(function(receipt){
        console.log("SENT:",receipt)
          // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      });

      //console.log(contract)
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
