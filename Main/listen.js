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
      console.log("Loaded account "+accounts[0])
      let contract = new web3.eth.Contract(abi,address)
      console.log("interact...")
      contract.events.SetContractAddress({
          /*filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23*/
          fromBlock: 0
      }, function(error, event){ console.log(event); })
      /*let events = myContract.events.allEvents((ev)=>{

      })

      events.watch(function(error, result){
          // result will contain various information
          // including the argumets given to the Deposit
          // call.
          if (!error)
              console.log(result);
      });*/
      /*
      var subscription = web3.eth.subscribe('logs', {
          address: address,
          topics: [address]
      }, function(error, result){
          if (error)
            console.log(error);
          else
            console.log(result)
      });
*/
  contract
      /*
      let requestsAddress = fs.readFileSync("../Requests/Requests.address").toString().trim();
      console.log("requestsAddress",requestsAddress)
      contract.methods.setContractAddress(10,requestsAddress).send({
        from: '0xe5A055CFe57287fEB89bbAE79538a3be3A06f62b',
        gas: 100000,
        gasPrice:5000000000
      }).then(function(receipt,data){
        console.log("SENT:",receipt,data)
          // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      });*/

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
