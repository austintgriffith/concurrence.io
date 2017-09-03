const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log("Reading data...")
const address = fs.readFileSync("../Requests/Requests.address").toString().trim()
let abi = false
if(!address){
  console.log("Couldn't load address")
}else{
  abi = JSON.parse(fs.readFileSync("../Requests/Requests.abi"));
  if(!abi){
    console.log("Couldn't load abi")
  }else{
    console.log("Loading...")
    web3.eth.getAccounts().then((accounts)=>{
      console.log("Loaded account [1] "+accounts[1])
      let contract = new web3.eth.Contract(abi,address)
      console.log("addRequest...")

      let combiner = "basic";
      let combinerAddress = fs.readFileSync("../Combiner/"+combiner+"/Combiner.address").toString().trim();
      //let combinerabi = JSON.parse(fs.readFileSync("../Combiner/"+combiner+"/Combiner.abi"));
      contract.methods.addRequest(web3.utils.randomHex(32),combinerAddress,3,"https://austingriffith.com").send({
        from: accounts[1],
        gasPrice: fs.readFileSync("../gasprice.int").toString().trim()*1000000000,
        gas: fs.readFileSync("../deploygas.int").toString().trim()
      }).then(function(receipt){
          console.log("SENT:",receipt)
          // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      });

      //console.log(contract)
    })
  }
}
