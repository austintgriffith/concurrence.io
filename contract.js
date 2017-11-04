const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(" ### CONTRACT")

var ACCOUNT_INDEX = 1
var startSeconds = new Date().getTime() / 1000;
var script = process.argv[2]
var contractdir = process.argv[3]
var contractname = process.argv[4]
if(!contractname || contractname=="null" ) contractname=contractdir
var address
var nextAddress
if(contractname=="previous" ){
  contractname=contractdir
  console.log("Reading for "+contractdir+"/"+contractname+".previous.address")
  address = fs.readFileSync(contractdir+"/"+contractname+".previous.address").toString().trim()
  nextAddress = fs.readFileSync(contractdir+"/"+contractname+".address").toString().trim()
}else{
  address = fs.readFileSync(contractdir+"/"+contractname+".address").toString().trim()
}
var blockNumber = 0
try{
   blockNumber = fs.readFileSync(contractdir+"/"+contractname+".blockNumber").toString().trim()
}catch(e){console.log(e)}
var abi = false
if(!address){
  console.log("Couldn't load "+contractdir+"/"+contractname+".address")
}else{
  abi = JSON.parse(fs.readFileSync(contractdir+"/"+contractname+".abi"));
  if(!abi){
    console.log("Couldn't load "+contractdir+"/"+contractname+".abi")
  }else{
    var ethPrice = parseInt(fs.readFileSync("ethprice.int").toString().trim())
    var gasPrice = fs.readFileSync("gasprice.int").toString().trim()
    var gas = fs.readFileSync("deploygas.int").toString().trim()
    var gaspricegwei = gasPrice*1000000000
    console.log("Loading accounts...")
    web3.eth.getAccounts().then((accounts)=>{
      web3.eth.getBalance(accounts[ACCOUNT_INDEX]).then((balance)=>{
        if(balance < 1000){
          web3.eth.personal.unlockAccount(accounts[1]).then((a,b,c)=>{
            interactWithContract(accounts,balance)
          })
        }else{
          interactWithContract(accounts,balance)
        }
      })
    })
  }
}

function interactWithContract(accounts,balance){
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
        blockNumber:blockNumber,
      }
      //check for previous address to pass along
      let previousAddressFile = contractdir+"/"+contractname+".previous.address"
      if(fs.existsSync(previousAddressFile)){
        params.previousAddress = fs.readFileSync(previousAddressFile).toString()
      }
      if(nextAddress) params.nextAddress = nextAddress;
      console.log(params)
      params.web3=web3//pass the web3 object so scripts have the utils
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
}
