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
      console.log("Loaded account [1] "+accounts[1])
      let contract = new web3.eth.Contract(abi,address)
      console.log("addRequest...")

      //eventually we will have a library combiners probably even third party
      // that means miners will need a way to know the combiner abi from the combiner address
      // for now we will use a hardcoded basic combiner and work out the dynamic stuff later
      // perhaps all combiner abis could be hashed and then that hash would come along with the address
      // then a miner could use the hash to find the abi it needs

      let combiner = "basic";
      let combinerAddress = fs.readFileSync("../Combiner/"+combiner+"/Combiner.address").toString().trim();
      //let combinerabi = JSON.parse(fs.readFileSync("../Combiner/"+combiner+"/Combiner.abi"));
      contract.methods.addRequest("SOMERANDOMHASH",combinerAddress,3,"https://ifconfig.co/json").send({
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




/*
let deployed = test.deploy({
  data: bytecode,
  arguments: ["CONARG1"]
})
console.log("Deployed...")

console.log(deployed)
*/
