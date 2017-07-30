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
    let contract = new web3.eth.Contract(abi)
    let deployed = contract.deploy({
      data: "0x"+bytecode,
      arguments: [fs.readFileSync("../Auth/Auth.address").toString().trim()]
    }).send({
      from: '0xdc1605c50b514b5caaa49d6abc5e58b40db09a58',
      gas: 500000,
      gasPrice:4000000000
    }, function(error, transactionHash){
      console.log("CALLBACK",error, transactionHash)
    })
    .then(function(newContractInstance){
        console.log("newContractInstance!",newContractInstance.options.address) // instance with the new contract address
        fs.writeFile(process.argv[2]+".address",newContractInstance.options.address)
        console.log("deployed!")
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
