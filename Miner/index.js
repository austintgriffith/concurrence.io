/*
Miner
*/
const IPFS = require('ipfs')
const ipfs = new IPFS(
  {
    EXPERIMENTAL:{
      pubsub: true
    }
  }
)
let ipfsReady = false

const RPC = true
const WEBSERVER = "requestco.in"

console.log("Starting up...")
const fs = require('fs');
const Web3 = require('web3');
const net = require('net');
const Request = require('request');
const client = net.Socket();

let web3
let connectionString
let mainContractAddress
let mainContractAbi
let mainContract
let authContractAddress
let authContractAbi
let authContract
let requestsContractAddress
let requestsContractAbi
let requestsContract
let tokenContractAddress
let tokenContractAbi
let tokenContract
let selectedAddress
let permission
let blockNumber

let requestList = []

let DEBUG_MINER = false

let activeRequest = false

setInterval(()=>{
  console.log("## ")
  if(activeRequest){
    console.log(".")
  }else{
    for(let r in requestList){
      let request = requestList[r]
      if(DEBUG_MINER) console.log(" request:",request)
      if(typeof request.reserved == "undefined"){
        console.log("# inspecting request "+request._id+" ("+request._url+")")
      }else if(request.reserved>0){
        console.log("# ("+request.reserved+") mining url "+request._url+" to combiner "+request._combiner)

        console.log("Looking up combiner address "+request._combiner+"...")
        Request('http://'+WEBSERVER+'/combinerLookup/'+request._combiner,(error, response, body)=>{
          if(error){console.log(error)}else{
            let combinerName = body
            console.log("combinerName for "+request._combiner+" is "+combinerName)
            console.log("Loading abi...")
            Request('http://'+WEBSERVER+'/combiner/abi/'+combinerName+"",(error, response, body)=>{
              if(error){console.log(error)}else{
                let combinerAbi = body
                try{

                  console.log("Parsing abi...")
                  let combinerAbiObject = JSON.parse(combinerAbi)

                  console.log("combinerAbiObject:",combinerAbiObject)

                  let combinerContract = new web3.eth.Contract(combinerAbiObject,request._combiner)


                  if(activeRequest){
                    console.log(".")
                  }else{
                    console.log(" --- Making the request to "+request._url)
                    Request(request._url,(error, response, body)=>{
                      if(error){
                        callback("Failed to mine "+request._url+"",body)
                      }else{
                        let responseBody = body
                        console.log("RESPONSE:\n",responseBody)




                        console.log("Ready to interact with combinerContract...")
                        activeRequest=true
                        web3.eth.getAccounts().then((accounts)=>{
                          combinerContract.methods.addResponse(request._id,Date.now(),0,200,responseBody).send({
                            from: accounts[2],
                            gasPrice: fs.readFileSync("../gasprice.int").toString().trim()*1000000000,
                            gas: fs.readFileSync("../deploygas.int").toString().trim()
                          }).then(function(receipt){
                            activeRequest=false
                            console.log("SENT:",receipt)
                            // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                          });
                        })

                      }
                    })
                  }

                }catch(e){
                  console.log(e)
                }
              }
            })
          }
        })

        return;
      }else{
        console.log("# request "+request._url+" is empty")
      }
    }
  }

},1000)


let DEBUGREQUESTLOAD = false
let blockNumberSearchBack=10000
let lastBlockBackSearchIndex
let lastBlockForwardSearchIndex
function loadRequests(){
  if(DEBUGREQUESTLOAD) console.log(" ~~ Loading requests...")
  if(DEBUGREQUESTLOAD) console.log(" ~~ Current Block Number: ",blockNumber)
  web3.eth.getBlockNumber((err,_currentBlockNumber)=>{
    if(DEBUGREQUESTLOAD) console.log(" ~~ _currentBlockNumber: "+_currentBlockNumber)
    if(_currentBlockNumber){
      lastBlockBackSearchIndex = _currentBlockNumber-blockNumberSearchBack
      lastBlockForwardSearchIndex = _currentBlockNumber
      if(DEBUGREQUESTLOAD) console.log(" ~~ Looking for AddRequest events from current block "+_currentBlockNumber+" back to block "+lastBlockBackSearchIndex)
      loadRequestsFromContract(requestsContract,lastBlockBackSearchIndex,"latest")
      if(DEBUGREQUESTLOAD) console.log(" ~~ Searching up and down the chain for more requests...")
      if(DEBUGREQUESTLOAD) console.log(" ~~ lastBlockBackSearchIndex:"+lastBlockBackSearchIndex)
      if(DEBUGREQUESTLOAD) console.log(" ~~ _currentBlockNumber:"+_currentBlockNumber)
      if(DEBUGREQUESTLOAD) console.log(" ~~ lastBlockForwardSearchIndex:"+lastBlockForwardSearchIndex)
      setInterval(()=>{
        if(DEBUGREQUESTLOAD) console.log(" ~~ -->")
        loadRequestsFromContract(requestsContract,lastBlockForwardSearchIndex-1,'latest')
        lastBlockForwardSearchIndex=_currentBlockNumber;
      },250)
      searchRequestsDownBlockchain();
    }
  })
}

function searchRequestsDownBlockchain(){
  if(DEBUGREQUESTLOAD) console.log(" ~~ <--")
  let nextLastBlockBackSearchIndex=lastBlockBackSearchIndex-blockNumberSearchBack
  if(nextLastBlockBackSearchIndex<0) nextLastBlockBackSearchIndex=0
  loadRequestsFromContract(requestsContract,nextLastBlockBackSearchIndex,lastBlockBackSearchIndex+1)
  lastBlockBackSearchIndex=nextLastBlockBackSearchIndex;
  if(lastBlockBackSearchIndex>0){
    setTimeout(searchRequestsDownBlockchain,750)
  }else{
    console.log(" ~~ finished searching down blockchain  ~~ ")
  }
}

function loadRequestsFromContract(requestsContract,fromBlock,toBlock){
  if(DEBUGREQUESTLOAD) console.log("Searching from "+fromBlock+" to "+toBlock)
  requestsContract.getPastEvents('AddRequest', {
    fromBlock: fromBlock,
    toBlock: toBlock
  }, function(error, events){
    if(DEBUGREQUESTLOAD) console.log("Found "+events.length+" from "+fromBlock+" to "+toBlock+" requests...");
    for(let request in events.reverse()){
      //if(DEBUG) console.log(events[request].returnValues)
      if(!requestList[events[request].returnValues._id]){
        if(DEBUGREQUESTLOAD) console.log("Adding request "+events[request].returnValues._id+" with combiner "+events[request].returnValues._combiner)
        requestList[events[request].returnValues._id] = events[request].returnValues
      }
    }
  })
}

/*
ipfs.on('ready', () => {
console.log("Ready?")
ipfs.id(function (err, identity) {
if (err) {
throw err
}
console.log(identity)
console.log("ISON",ipfs.isOnline())
})
})
*/

//Start everything off by attempting to connect to eth network
connectToEthereumNetwork()

setInterval(()=>{
  if(requestList&&tokenContract){
    loadReservedCoinInRequests()
  }else{console.log("###")}
},15000)

setInterval(()=>{
  if(requestList&&tokenContract){
    loadReservedCoinInRequests()
  }else{console.log("###")}
},15000)


ipfs.on('ready', () => {
  console.log("@@ IPFS READY @@")
  ipfsReady=true
})
ipfs.on('error', (e) => console.log("@@@ IPFS ERROR",e))

function connectToEthereumNetwork(){
  if(RPC){
    console.log("Using RPC...")
    connectionString = 'http://localhost:8545'
    web3 = new Web3(new Web3.providers.HttpProvider(connectionString));
  }else{
    console.log("Using IPC...")
    connectionString = '/Users/austingriffith/Library/Ethereum/testnet/geth.ipc';
    web3 = new Web3(new Web3.providers.IpcProvider(connectionString, client));
  }
  console.log("Checking for accounts on ethereum network ("+connectionString+")...")
  web3.eth.getAccounts().then((accounts)=>{
    console.log(accounts)

    selectedAddress=accounts[0]

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
    Request('http://'+WEBSERVER+'/address/'+contract,(error, response, body)=>{
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
    Request('http://'+WEBSERVER+'/abi/'+contract,(error, response, body)=>{
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
      mainContract = new web3.eth.Contract(mainContractAbi,mainContractAddress)
      console.log("Ready to interact with mainContract...")
      mainContract.methods.getContractAddress(0).call().then((_authContractAddress)=>{
        console.log("Setting _authContractAddress to "+_authContractAddress)
        authContractAddress = _authContractAddress
        mainContract.methods.getContractAddress(10).call().then((_requestsContractAddress)=>{
          console.log("Setting _requestsContractAddress to "+_requestsContractAddress)
          requestsContractAddress = _requestsContractAddress
          mainContract.methods.getContractAddress(20).call().then((_tokenContractAddress)=>{
            console.log("Setting _tokenContractAddress to "+_tokenContractAddress)
            tokenContractAddress = _tokenContractAddress
            connectToAuthContract()
          })
        })
      })
    }
  })
}


function connectToAuthContract(){
  console.log("Connecting to auth contract...")
  loadContractAbi("Auth",authContractAddress,(err,address,abi) => {
    if(err){
      console.log(err)
    }else{
      authContractAbi=abi
      authContract = new web3.eth.Contract(authContractAbi,authContractAddress)
      console.log("Ready to interact with authContract...")
      authContract.methods.getPermission(selectedAddress).call().then((_permission)=>{
        console.log("Permission level: "+_permission)
        permission=_permission;
        connectToRequestsContract()
      })
    }
  })
}


function connectToRequestsContract(){
  console.log("Connecting to requests contract...")
  loadContractAbi("Requests",requestsContractAddress,(err,address,abi) => {
    if(err){
      console.log(err)
    }else{
      requestsContractAbi=abi
      requestsContract = new web3.eth.Contract(requestsContractAbi,requestsContractAddress)
      console.log("Ready to interact with requestsContract...")
      requestsContract.methods.mainAddress().call().then((_mainAddress)=>{
        console.log("_mainAddress: "+_mainAddress)
        connectToTokenContract()
      })
    }
  })
}


function connectToTokenContract(){
  console.log("Connecting to token contract...")
  loadContractAbi("Token ",tokenContractAddress,(err,address,abi) => {
    if(err){
      console.log(err)
    }else{
      tokenContractAbi=abi
      tokenContract = new web3.eth.Contract(tokenContractAbi,tokenContractAddress)
      console.log("Ready to interact with tokenContract...")
      tokenContract.methods.mainAddress().call().then((_mainAddress)=>{
        console.log("_mainAddress: "+_mainAddress)
        loadRequests()
        setTimeout(loadReservedCoinInRequests,5000)
      })
    }
  })
}


function loadReservedCoinInRequests(){
  let DEBUG=false
  if(DEBUG) console.log("## REQUESTS ")
  for(let req in requestList){
    //for each request we want to see how much coin is still reserved
    //getReserved(address _combiner,bytes32 _id) constant returns (uint)
    //getReservedByString(address _combiner,string _id) constant returns (uint){
    if(typeof requestList[req].reserved == "undefined" || requestList[req].reserved>0 ){
      if(DEBUG) console.log(requestList[req]._id)
      tokenContract.methods.getReservedByString(requestList[req]._combiner,requestList[req]._id).call().then((_reserved)=>{
        if(DEBUG) console.log("_reserved: "+_reserved)
        requestList[req].reserved=_reserved
      })
    }

    if(requestList[req].reserved){
      if(DEBUG) console.log("#  "+requestList[req]._id+" ("+requestList[req].reserved+") "+requestList[req]._url)
    }
  }
}
