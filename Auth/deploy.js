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

    let ethPrice = parseInt(fs.readFileSync("../ethprice.int").toString().trim())
    web3.eth.getAccounts().then((accounts)=>{
      web3.eth.getBalance(accounts[0]).then((balance)=>{
        let etherbalance = web3.utils.fromWei(balance,"ether");
        console.log(etherbalance+" $"+(etherbalance*ethPrice))

        console.log("\nLoaded account "+accounts[0])
        console.log("Deploying...",bytecode,abi)
        let contract = new web3.eth.Contract(abi)
        let gasPrice = fs.readFileSync("../gasprice.int").toString().trim()
        let gas = fs.readFileSync("../deploygas.int").toString().trim()
        let gaspricegwei = gasPrice*1000000000
        console.log("paying a max of "+gas+" gas @ the price of "+gasPrice+" gwei ("+gaspricegwei+")")
        let deployed = contract.deploy({
          data: "0x"+bytecode
        }).send({
          from: accounts[0],
          gas: gas,
          gasPrice: gaspricegwei
        }, function(error, transactionHash){
          console.log("CALLBACK",error, transactionHash)
          setInterval(()=>{
            web3.eth.getTransactionReceipt(transactionHash,(error,result)=>{
              if(result && result.contractAddress && result.cumulativeGasUsed){
                console.log("Success",result)

                web3.eth.getBalance(accounts[0]).then((balance)=>{
                  let endetherbalance = web3.utils.fromWei(balance,"ether");
                  let etherdiff = etherbalance-endetherbalance
                  console.log("==ETHER COST: "+etherdiff+" $"+(etherdiff*ethPrice))
                  console.log("Writing to ",process.argv[2]+".address","Data:",result.contractAddress)
                  fs.writeFileSync(process.argv[2]+".address",result.contractAddress)
                  process.exit(0);
                })

              }else{
                console.log(".")
              }
            })
          },3000)
        })

      })
    })








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
