const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let ACCOUNT_INDEX = 1

let startSeconds = new Date().getTime() / 1000;

let contractdir = process.argv[2]
let contractname = process.argv[3]
if(!contractname) contractname=contractdir

console.log("Reading data...")
let bytecode = fs.readFileSync(contractdir+"/"+contractname+".bytecode").toString()
let abi = false
if(!bytecode){
  console.log("Couldn't load "+contractdir+"/"+contractname+".bytecode")
}else{
  abi = JSON.parse(fs.readFileSync(contractdir+"/"+contractname+".abi"));
  if(!abi){
    console.log("Couldn't load "+contractdir+"/"+contractname+".abi")
  }else{
    let ethPrice = parseInt(fs.readFileSync("ethprice.int").toString().trim())
    web3.eth.getAccounts().then((accounts)=>{
      web3.eth.getBalance(accounts[ACCOUNT_INDEX]).then((balance)=>{
      //  web3.eth.personal.unlockAccount(accounts[1]).then((a,b,c)=>{
          let etherbalance = web3.utils.fromWei(balance,"ether");
          console.log(etherbalance+" $"+(etherbalance*ethPrice))

          console.log("\nLoaded account "+accounts[ACCOUNT_INDEX])
          console.log("Deploying...",bytecode,abi)
          let contract = new web3.eth.Contract(abi)
          let gasPrice = fs.readFileSync("gasprice.int").toString().trim()
          let gas = fs.readFileSync("deploygas.int").toString().trim()
          let gaspricegwei = gasPrice*1000000000
          console.log("paying a max of "+gas+" gas @ the price of "+gasPrice+" gwei ("+gaspricegwei+")")
          let arguments = []
          try{
            let path = "./"+contractdir+"/arguments.js"
            if(fs.existsSync(path)){
              console.log("looking for arguments in ",path)
              arguments=require(path)
            }
          }catch(e){console.log(e)}
          console.log("arguments:",arguments)
          let deployed = contract.deploy({
            data: "0x"+bytecode,
            arguments: arguments
          }).send({
            from: accounts[ACCOUNT_INDEX],
            gas: gas,
            gasPrice: gaspricegwei
          }, function(error, transactionHash){
            console.log("CALLBACK",error, transactionHash)
            setInterval(()=>{
              web3.eth.getTransactionReceipt(transactionHash,(error,result)=>{
                if(result && result.contractAddress && result.cumulativeGasUsed){
                  console.log("Success",result)

                  web3.eth.getBalance(accounts[ACCOUNT_INDEX]).then((balance)=>{
                    let endetherbalance = web3.utils.fromWei(balance,"ether");
                    let etherdiff = etherbalance-endetherbalance
                    console.log("==ETHER COST: "+etherdiff+" $"+(etherdiff*ethPrice))
                    console.log("Saving contract address:",result.contractAddress)
                    fs.writeFileSync(contractdir+"/"+contractname+".address",result.contractAddress)
                    fs.writeFileSync(contractdir+"/"+contractname+".blockNumber",result.blockNumber)

                    let endSeconds = new Date().getTime() / 1000;
                    let duration = Math.floor((endSeconds-startSeconds))
                    console.log("deploy time: ",duration)

                    fs.appendFileSync("./deploy.log",contractdir+"/"+contractname+" "+result.contractAddress+" "+duration+" "+etherdiff+" $"+(etherdiff*ethPrice)+" "+gaspricegwei+"\n")

                    process.exit(0);
                  })

                }else{
                  process.stdout.write(".")
                }
              })
            },1000)
          })
      //  })
      })
    })
  }
}
