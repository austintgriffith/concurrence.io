---
title: "Example"
date: 2017-09-21T17:12:22-06:00
draft: true
---

In the not-to-distant future, farmers all around the world could pay Ether into a smart contract that would provide agricultural insurance against hail or drought. Then, throughout the year, as "request miners" detect these specific weather conditions using multiple APIs and other internet sources, the contract would deterministically pay Ether back to the farmers in need. This incredibly efficient system completely sidesteps an entire field of insurance agents and adjusters, immediately helping the farmers in need without any unnecessary overhead.  

Let's dive into an oversimplified (and insecure) example contract just to understand the mechanics of how such a system would work.

First, we'll need a way to signal miners that a consensus is needed for a particular data point:
```javascript
mapping (bytes32 => string) public requests;

function addRequest(bytes32 _id, string _url) returns (bool){
    requests[_id]=_url;
    AddRequest(msg.sender,_id,requests[_id]);
}
event AddRequest(address _sender,bytes32 _id, string _url);
```

With the **addRequest** function we can store a request and trigger an event called **AddRequest** on the blockchain.

Miners could then, off-chain, make requests to a number of internet endpoints, collecting relevant data, and sending it back to the contract.
```javascript
contract.getPastEvents('AddRequest', {
    fromBlock: params.blockNumber,
    toBlock: 'latest'
}, function(error, events){
  for(let e in events){
    request(events[e].returnValues._url, function (error, response, body) {
       contract.methods.addResponse(events[e].returnValues._id,body).send({
         from: params.account,
         gas: params.gas,
         gasPrice:params.gasPrice
       })
    })
  }
})
```

The **addResponse** method is used to store the final response that other contracts could then use to drive their logic.
```javascript
mapping(bytes32 => uint ) public responses;

function addResponse(bytes32 _id,uint _result) returns (bool){
    responses[_id]=_result;
    AddResponse(msg.sender,_id,responses[_id]);
}
event AddResponse(address _sender,bytes32 _id,uint _result);
```

This simplified example is the heart of a decentralized oracle network and in the following posts, we will build a more robust system around this idea.
