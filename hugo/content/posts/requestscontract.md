---
title: "Requests Contract"
date: 2017-09-23T18:28:34-06:00
draft: true
---
The **Requests** contract is the main datastore for requests.

```
pragma solidity ^0.4.0;

import "Auth.sol";
import "Main.sol";
import "Token.sol";

contract Requests {

  address public mainAddress;
  bool public frozen;

  function Requests(address _mainAddress) {
    mainAddress=_mainAddress;
  }

  function setMainAddress(address _mainAddress){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    if( auth.isOwner(msg.sender) ){
      mainAddress=_mainAddress;
    }
  }

  ///// Request ----------------------------------------------
  struct Request{
    string url;//ex "http://ifconfig.co"
    address combiner;//ex 3 (this would mean contract 103)
  }

  mapping (bytes32 => Request) public requests;

  event ErrorString(string _str);
  event AddRequest(address _sender,string _id,address _combiner,uint _coin, string _url);
  event AttemptAddRequest(address _sender,string _id,address _combiner,uint _coin, string _url);

  function addRequest(string _id, address _combiner, uint _coin, string _url) returns (bool){
    AttemptAddRequest(msg.sender,_id,_combiner,_coin,_url);
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    Token token = Token(main.getContractAddress(20));
    if( auth.getPermission(msg.sender)>=32 ){
      bytes32 __id = stringToBytes32(_id);
      if( token.reserve(msg.sender,_combiner,__id,_coin) ){
        requests[__id].url=_url;
        requests[__id].combiner=_combiner;
        AddRequest(msg.sender,_id,_combiner,_coin,_url);
        return true;
      }else{
        ErrorString("Failed to reserve!");
        return false;
      }
    }else{
      ErrorString("Failed to get permission!");
      return false;
    }
  }

  function getRequest(string _id) constant returns (uint,string,address){
    bytes32 __id = stringToBytes32(_id);
    Main main = Main(mainAddress);
    Token token = Token(main.getContractAddress(20));
    return ( token.getReserved(requests[__id].combiner,__id), requests[__id].url, requests[__id].combiner );
  }

}

```
Current address:
```
0x4a63c5DAFB88a3A46A40b58B7cF3f512cF87655a
```
Current ABI:
```
[{"constant":true,"inputs":[],"name":"frozen","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"string"},{"name":"_combiner","type":"address"},{"name":"_coin","type":"uint256"},{"name":"_url","type":"string"}],"name":"addRequest","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"mainAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_ancestor","type":"address"}],"name":"setAncestor","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"toggle","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"string"}],"name":"getRequest","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"requests","outputs":[{"name":"url","type":"string"},{"name":"combiner","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ancestor","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_predecessor","type":"address"}],"name":"setPredecessor","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"predecessor","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"source","type":"string"}],"name":"stringToBytes32","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_mainAddress","type":"address"}],"name":"setMainAddress","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_mainAddress","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_str","type":"string"}],"name":"ErrorString","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_sender","type":"address"},{"indexed":false,"name":"_id","type":"string"},{"indexed":false,"name":"_combiner","type":"address"},{"indexed":false,"name":"_coin","type":"uint256"},{"indexed":false,"name":"_url","type":"string"}],"name":"AddRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_sender","type":"address"},{"indexed":false,"name":"_id","type":"string"},{"indexed":false,"name":"_combiner","type":"address"},{"indexed":false,"name":"_coin","type":"uint256"},{"indexed":false,"name":"_url","type":"string"}],"name":"AttemptAddRequest","type":"event"}]
```
