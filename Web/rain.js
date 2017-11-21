const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const request = require('request');


console.log("Requesting KFNL...")
request.get({
    url: 'http://w1.weather.gov/data/obhistory/KFNL.html'
}, function (err, res) {
  if(err){console.log(err)}else{
    console.log(res.body)
  }
});
