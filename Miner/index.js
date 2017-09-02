const RPC = true
const WEBSERVER = "localhost"

console.log("Starting up...")
const fs = require('fs');
const Web3 = require('web3');
const net = require('net');
const request = require('request');
const client = net.Socket();

let web3
let mainContractAddress
let mainContractAbi
let authContractAddress
let authContractAbi
let requestsContractAddress
let requestsContractAbi
let tokenContractAddress
let tokenContractAbi

function connectToEthereumNetwork(){
  if(RPC){
    console.log("Using RPC...")
    const rpcNode = 'http://localhost:8545'
    web3 = new Web3(new Web3.providers.HttpProvider(rpcNode));
  }else{
    console.log("Using IPC...")
    const ipcNode = '/Users/austingriffith/Library/Ethereum/testnet/geth.ipc';
    web3 = new Web3(new Web3.providers.IpcProvider(ipcNode, client));
  }
  console.log("Checking for accounts ethereum network...")
  web3.eth.getAccounts().then((accounts)=>{
    console.log(accounts)
    connectToMainContract()
  })
}

function loadContractAddress(contract,callback){
  let address
  try{
    console.log("Reading",contract+".address")
    address = fs.readFileSync(contract+".address").toString().trim()
    console.log("Reading",address+".abi")
    let abi = JSON.parse(fs.readFileSync(address+".abi").toString())
    console.log(contract+" contract data loaded locally...")
    callback(null,address,abi)
  }catch(e){
    console.log("Failed to load "+contract+" contract data locally, attempting to download...")
    console.log("Connecting to "+WEBSERVER+"...")
    request('http://'+WEBSERVER+'/address/'+contract,(error, response, body)=>{
      if(error){
        callback("Failed to load "+contract+" address from "+WEBSERVER+"!")
      }else{
        address = body.trim()
        loadContractAbi(contract,address,callback)
      }
    })
  }
}

function loadContractAbi(contract,address,callback){
  let abi
  try{
    abi = JSON.parse(fs.readFileSync(address+".abi").toString())
    console.log(contract+" contract abi loaded locally...")
    callback(null,address,abi)
  }catch(e){
    console.log("Failed to load "+contract+" abi locally, attempting to download...")
    console.log("Connecting to "+WEBSERVER+"...")
    request('http://'+WEBSERVER+'/abi/'+contract,(error, response, body)=>{
      if(!error){
        try{
          abi = JSON.parse(body)
          console.log("writing",contract+".address")
          fs.writeFileSync(contract+".address",address)
          console.log("writing",address+".abi")
          fs.writeFileSync(address+".abi",JSON.stringify(abi))
          callback(null,address,abi)
        }catch(e){
          callback("Failed to parse main ABI from "+WEBSERVER+"!")
        }
      }
    })
  }
}

function connectToMainContract(){
  console.log("Connecting to main contract...")
  loadContractAddress("Main",(err,address,abi) => {
    if(err){
      console.log(err)
    }else{
      mainContractAddress=address
      mainContractAbi=abi
      let mainContract = new web3.eth.Contract(mainContractAbi,mainContractAddress)
      console.log("Ready to interact with mainContract...")
      mainContract.methods.getContractAddress(0).call().then((_authContractAddress)=>{
        console.log("Setting authContractAddress to "+_authContractAddress)
        authContractAddress = _authContractAddress
        mainContract.methods.getContractAddress(10).call().then((_requestsContractAddress)=>{
          console.log("Setting authContractAddress to "+_requestsContractAddress)
          requestsContractAddress = _requestsContractAddress
          mainContract.methods.getContractAddress(20).call().then((_tokenContractAddress)=>{
            console.log("Setting authContractAddress to "+_tokenContractAddress)
            tokenContractAddress = _tokenContractAddress
          })
        })
      })
    }
  })
}


function connectToAuthContract(){
  loadContractAbi("Auth",authContractAddress,(err,address,abi) => {
    if(err){
      console.log(err)
    }else{
      authContractAbi=abi
      /*let mainContract = new web3.eth.Contract(mainAbi,mainAddress)
      console.log("Ready to interact with mainContract...")
      mainContract.methods.getContractAddress(0).call().then((_authContractAddress)=>{
        console.log("Setting authContractAddress to "+_authContractAddress)
        authContractAddress = _authContractAddress
        mainContract.methods.getContractAddress(10).call().then((_requestsContractAddress)=>{
          console.log("Setting authContractAddress to "+_requestsContractAddress)
          requestsContractAddress = _requestsContractAddress
          mainContract.methods.getContractAddress(20).call().then((_tokenContractAddress)=>{
            console.log("Setting authContractAddress to "+_tokenContractAddress)
            tokenContractAddress = _tokenContractAddress
          })
        })
      })*/
    }
  })
}


//Start everything off by attempting to connect to eth network
connectToEthereumNetwork()
