const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log("Reading data...")
let bytecode = fs.readFileSync(process.argv[2]+".bytecode").toString()
let abi = false
if(!bytecode){
  console.log("Couldn't load "+process.argv[2]+".bytecode")
}else{
  abi = JSON.parse(fs.readFileSync(process.argv[2]+".abi"));
  if(!abi){
    console.log("Couldn't load "+process.argv[2]+".abi")
  }else{
    console.log("Deploying...",bytecode,abi)
    web3.eth.getAccounts().then((accounts)=>{
      console.log("Loaded account "+accounts[0])
      let contract = new web3.eth.Contract(abi)
      let gasPrice = fs.readFileSync("../gasprice.int").toString().trim()
      let gas = fs.readFileSync("../deploygas.int").toString().trim()
      let gaspricegwei = gasPrice*1000000000
      console.log("paying a max of "+gas+" gas @ the price of "+gasPrice+" gwei ("+gaspricegwei+")")
      let deployed = contract.deploy({
        data: "0x"+bytecode,
        arguments: [fs.readFileSync("../Main/Main.address").toString().trim()]
      }).send({
        from: accounts[0],
        gas: gas,
        gasPrice: gaspricegwei
      }, function(error, transactionHash){
        console.log("CALLBACK",error, transactionHash)
      })
      .then(function(newContractInstance){
          console.log("newContractInstance!",newContractInstance.options.address) // instance with the new contract address
          fs.writeFile(process.argv[2]+".address",newContractInstance.options.address)
          console.log("deployed!")
      });
    });
  }
}

/*
{
    from: '0xe5a055cfe57287feb89bbae79538a3be3a06f62b',
    gas: 1500000,
    gasPrice: '30000000000000'
}

/*
.on('error', function(error){ console.log("ERROR",error) })
.on('transactionHash', function(transactionHash){ console.log("transactionHash",transactionHash)})
.on('receipt', function(receipt){
   console.log("receipt",receipt.contractAddress) // contains the new contract address
})
.on('confirmation', function(confirmationNumber, receipt){ console.log("confirmation",confirmationNumber,receipt) })
*/



/*
let deployed = test.deploy({
  data: bytecode,
  arguments: ["CONARG1"]
})
console.log("Deployed...")

console.log(deployed)
*/
