---
title: "Crafting Scripts"
date: 2017-09-23T14:10:00-06:00
draft: true
---
Before we can compile and deploy our fleet of smart contracts, we'll need to build a handful of useful scripts. They will also require a couple dependancies:

```bash
npm install solc web3
```

Let's set up a few global variables:
```bash
echo "20" > gasprice.int
echo "280" > ethprice.int
echo "2000000" > deploygas.int
echo "200000" > xfergas.int
```
<!--
lib.js
------------------
*brings in global variables and prepares helper functions and dependancies*
-->



personal.js
------------------
*reports current account balances and unlocks accounts*

```javascript
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(" ### PERSONAL")
let count = 1
if(process.argv[2]) count = process.argv[2]


web3.eth.getAccounts().then((accounts)=>{
  for(let i=0;i<count;i++){
    web3.eth.getBalance(accounts[i]).then((balance)=>{
      console.log(" ######### "+i+" # "+accounts[i]+" "+balance)
      try{
        web3.eth.personal.unlockAccount(accounts[i]).then((a,b,c)=>{
          console.log("unlocked "+i+": "+a)

        })
      }catch(e){console.log(e)}

    })
  }
})

```

send.js
------------------
*sends ether from one account to another*

```javascript
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(" ### PERSONAL")
let count = 1
if(process.argv[2]) count = process.argv[2]

let to = 2
let from = 1
let amount = 0.1

//EXAMPLE USAGE: node send #AMOUNT# #FROM(index in accounts)# #TO(index in accounts)#

if(process.argv[2]){
  amount=process.argv[2]
}
if(process.argv[3]){
  from=process.argv[3]
}
if(process.argv[4]){
  to=process.argv[4]
}

//eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1], value: web3.toWei(0.1, "ether"),gas: 90000, gasPrice:2000000000})
let gasPrice = fs.readFileSync("gasprice.int").toString().trim()
let gas = fs.readFileSync("xfergas.int").toString().trim()
let gaspricegwei = web3.utils.toWei(gasPrice,'gwei')
console.log("SENDING ")

web3.eth.getAccounts().then((accounts)=>{

  let params = {
    from: accounts[from],
    to: accounts[to],
    value: web3.utils.toWei(amount, "ether"),
    gas: gas,
    gasPrice: gaspricegwei
  }
  console.log(params)
  web3.eth.sendTransaction(params,(error,transactionHash)=>{
    console.log(error,transactionHash)
    setInterval(()=>{
      web3.eth.getTransactionReceipt(transactionHash,(error,result)=>{
        if(result&&result.to&&result.from){
          console.log(result)
          process.exit(0);
        }else{
          console.log(".")
        }
      })
    },10000)
  })

})

```
compile.js
------------------
*compiles a contract*

```javascript
const fs = require('fs');
const solc = require('solc');

let startSeconds = new Date().getTime() / 1000;

let contractdir = process.argv[2]
let contractname = process.argv[3]
if(!contractname) contractname=contractdir


console.log("Compiling "+contractdir+"/"+contractname+".sol ...")
const input = fs.readFileSync(contractdir+"/"+contractname+'.sol');
if(!input){
  console.log("Couldn't load "+contractdir+"/"+contractname+".sol")
}else{

  let dependencies
  try{
    let path = "./"+contractdir+"/dependencies.js"
    if(fs.existsSync(path)){
      console.log("looking for dependencies at ",path)
      dependencies=require(path)
    }
  }catch(e){console.log(e)}
  if(!dependencies) dependencies={}

  dependencies[contractdir+"/"+contractname+".sol"] = fs.readFileSync(contractdir+"/"+contractname+".sol", 'utf8');
  const output = solc.compile({sources: dependencies}, 1);
  console.log(output)
  const bytecode = output.contracts[contractdir+"/"+contractname+".sol:"+contractname].bytecode;
  const abi = output.contracts[contractdir+"/"+contractname+".sol:"+contractname].interface;
  fs.writeFile(contractdir+"/"+contractname+".bytecode",bytecode)
  fs.writeFile(contractdir+"/"+contractname+".abi",abi)
  console.log("Compiled!")
}

```
deploy.js
------------------
*deploys a contract*

```javascript
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

```
contract.js
------------------
*provides other scripts with an interface to contracts through abstraction*

```javascript
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let startSeconds = new Date().getTime() / 1000;

let script = process.argv[2]
let contractdir = process.argv[3]
let contractname = process.argv[4]
if(!contractname || contractname=="null") contractname=contractdir

console.log("Reading data...")
let address = fs.readFileSync(contractdir+"/"+contractname+".address").toString().trim()
let blockNumber = 0
try{
   blockNumber = fs.readFileSync(contractdir+"/"+contractname+".blockNumber").toString().trim()
}catch(e){console.log(e)}

let abi = false
if(!address){
  console.log("Couldn't load "+contractdir+"/"+contractname+".address")
}else{
  abi = JSON.parse(fs.readFileSync(contractdir+"/"+contractname+".abi"));
  if(!abi){
    console.log("Couldn't load "+contractdir+"/"+contractname+".abi")
  }else{
    let ethPrice = parseInt(fs.readFileSync("ethprice.int").toString().trim())
    let gasPrice = fs.readFileSync("gasprice.int").toString().trim()
    let gas = fs.readFileSync("deploygas.int").toString().trim()
    let gaspricegwei = gasPrice*1000000000

    console.log("Loading accounts...")
    web3.eth.getAccounts().then((accounts)=>{

      console.log("Run script ",script," on ",contractname)
      let contract = new web3.eth.Contract(abi,address)

      console.log("paying a max of "+gas+" gas @ the price of "+gasPrice+" gwei ("+gaspricegwei+")")
      let scriptFunction
      try{
        let path = "./"+contractdir+"/"+script+".js"
        console.log("LOADING:",path)
        if(fs.existsSync(path)){
          console.log("looking for script at ",path)
          scriptFunction=require(path)
        }
      }catch(e){console.log(e)}
      if(scriptFunction){
        console.log("Loaded "+script+", running...")
        let params = {
          gas:gas,
          gasPrice:gaspricegwei,
          accounts:accounts,
          blockNumber:blockNumber
        }
        console.log(params)
        let scriptPromise = scriptFunction(contract,params,process.argv)
        if(!scriptPromise || typeof scriptPromise.once != "function"){
          console.log(""+script+" (no promise)")
        }
        else{
          let result = scriptPromise.once('transactionHash', function(transactionHash){
            console.log("transactionHash",transactionHash)
            setInterval(()=>{
              web3.eth.getTransactionReceipt(transactionHash,(error,result)=>{
                console.log(error,result)
                if(result){
                  console.log(result.blockNumber,result.gasUsed)
                }
                if(result && result.blockNumber && result.gasUsed){
                  console.log("Success",result)
                  let etherdiff = result.gasUsed/100000000000000000
                  console.log("==ETHER COST: "+etherdiff+" $"+(etherdiff*ethPrice))
                  let endSeconds = new Date().getTime() / 1000;
                  let duration = Math.floor((endSeconds-startSeconds))
                  console.log("time: ",duration)
                  fs.appendFileSync("./contract.log",contractdir+"/"+contractname+" "+script+" "+result.contractAddress+" "+duration+" "+etherdiff+" $"+(etherdiff*ethPrice)+" "+gaspricegwei+"\n")
                  process.exit(0);
                }
              })
            },5000)

          })
        }

      }else{
        console.log("UNABLE TO LOAD SCRIPT "+script+" for "+contractname)
      }
    })
  }
}

```
