const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var request = require('request');

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
      console.log("Ready to interact...")
      let index = 0;
      contract.methods.mainAddress().call().then((mainAddress)=>{
        console.log("The current mainAddress is ",mainAddress)


      //at this point you want to actually watch for AddRequest events and mine them
      //but for now we are hardcoding a specific "SOMERANDOMHASH"


            contract.methods.getRequest("SOMERANDOMHASH").call().then((requestArray)=>{
              console.log("The current request is ",requestArray)

              let coin = requestArray[0];
              let url = requestArray[1];
              let combiner = requestArray[2];
              //if(coin<=0 ){
              //  console.log("No coins left, no point in mining")
              //}else{
                let start = Date.now();
                request(url, function (error, response, body) {
                   let duration = Math.floor(Date.now() - start);
                   let timestamp = Date.now();
                   console.log("timestamp:",timestamp);
                   console.log("duration:",duration);
                   console.log('error:', error); // Print the error if one occurred
                   if(response){
                     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                     console.log('body:', body); // Print the HTML for the Google homepage.

                     //for now we will ignore the combiner they defined and send it to a hardcoded version
                     // of the last that we deployed
                     // in the future there will probably be a table of address->abi conversions or something
                     const combinerType = "basic";
                     const combinerAddress = fs.readFileSync("../Combiner/"+combinerType+"/Combiner.address").toString().trim()
                     const combinerAbi = JSON.parse(fs.readFileSync("../Combiner/"+combinerType+"/Combiner.abi").toString().trim())

                     //you will then need to read the abi and figure out what and how you pass in to addResponse

                     let combinerContract = new web3.eth.Contract(combinerAbi,combinerAddress)
                     //addResponse(string _id,uint32 _timestamp,uint32 _duration, uint16 _status, string _result)
                     combinerContract.methods.addResponse("SOMERANDOMHASH",timestamp,duration,parseInt(response.statusCode),body).send({
                       from: accounts[2],
                       gas: 500000,
                       gasPrice: fs.readFileSync("../gasprice.int").toString().trim()*1000000000
                     }).then(function(receipt){
                         console.log("SENT:",receipt)
                     })
                   }else{
                     console.log("Request Failed, Response is null")
                   }
                 });
              //}
            })
        //})
      })
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
