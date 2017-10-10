---
title: "Combiner Contracts"
date: 2017-09-23T18:28:34-06:00
draft: true
---
The **Combiner** contracts are the most dynamic. In fact, they can even be written and deployed by a third party. Their job is to capture responses from miners, deliver rewards to good actors, and come to a consensus. External contracts will also then communicate with the respective combiner contracts to retrieve mined, internet data.

```
/*
  Basic Combiner
  This is more of an example combiner
*/
pragma solidity ^0.4.0;

import "Main.sol";
import "Token.sol";

contract Combiner{

    uint public rewardCoin = 1;

    address public mainAddress;
    function Combiner(address _mainAddress) {
        mainAddress=_mainAddress;
    }

    struct Response{
        bool exists;
        uint32 timestamp;
        uint32 duration;//ex 400 (milliseconds)
        uint16 status;//ex 200
        string result;//ex "html, json, plain text, but mostly a hash of an ipfs address where the content is uploaded"
        address next;// linked list
        uint reward;//ex 1
    }

    mapping(bytes32 => mapping (address => Response) ) public responses;
    mapping(bytes32 => address ) public head;
    mapping(bytes32 => uint16 ) public count;

    //event ErrorString(string _str);
    event AddResponse(string _id,address _miner,uint32 _timestamp, uint32 _duration,uint16 _status, string _result,address head, address next, uint reward);

    function addResponse(string _id,uint32 _timestamp,uint32 _duration, uint16 _status, string _result) returns (bool){
        bytes32 __id = stringToBytes32(_id);
        //AddResponseAttempt(_id,msg.sender,_duration,_status,_result);
        if(!responses[__id][msg.sender].exists){
          responses[__id][msg.sender].exists=true;
          if(head[__id]==address(0)){
              //this is the first response
              head[__id] = msg.sender;
              //responses[__id][msg.sender].next stays at 0x0
          }else{
              //other responses exist, add to head
              responses[__id][msg.sender].next = head[__id];
              head[__id] = msg.sender;
          }
          count[__id]++;
        }

        responses[__id][msg.sender].timestamp=_timestamp;
        responses[__id][msg.sender].duration=_duration;
        responses[__id][msg.sender].status=_status;
        responses[__id][msg.sender].result=_result;

        Main main = Main(mainAddress);
        Token token = Token(main.getContractAddress(20));
        //reward(bytes32 _id,address _miner,uint256 _amount)
        if( token.reward(__id,msg.sender,rewardCoin) ){
          responses[__id][msg.sender].reward = rewardCoin;
          AddResponse(_id,msg.sender,_timestamp,_duration,_status,_result,head[__id],responses[__id][msg.sender].next,responses[__id][msg.sender].reward);
          return true;
        }else{
          responses[__id][msg.sender].reward = 0;
          AddResponse(_id,msg.sender,_timestamp,_duration,_status,_result,head[__id],responses[__id][msg.sender].next,responses[__id][msg.sender].reward);
          return false;
        }
    }

    function stringToBytes32(string memory source) returns (bytes32) {
      bytes32 result;
      assembly {
          result := mload(add(source, 32))
      }
      return result;
    }

}

```
Current address:
```
0x3158D85a4BaD21140a2C2a2DdE2f57DFBA56D0e8
```
Current ABI:
```
[{"constant":true,"inputs":[],"name":"mainAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"rewardCoin","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"address"}],"name":"responses","outputs":[{"name":"exists","type":"bool"},{"name":"timestamp","type":"uint32"},{"name":"duration","type":"uint32"},{"name":"status","type":"uint16"},{"name":"result","type":"string"},{"name":"next","type":"address"},{"name":"reward","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"count","outputs":[{"name":"","type":"uint16"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"source","type":"string"}],"name":"stringToBytes32","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"string"},{"name":"_timestamp","type":"uint32"},{"name":"_duration","type":"uint32"},{"name":"_status","type":"uint16"},{"name":"_result","type":"string"}],"name":"addResponse","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"head","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_mainAddress","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_id","type":"string"},{"indexed":false,"name":"_miner","type":"address"},{"indexed":false,"name":"_timestamp","type":"uint32"},{"indexed":false,"name":"_duration","type":"uint32"},{"indexed":false,"name":"_status","type":"uint16"},{"indexed":false,"name":"_result","type":"string"},{"indexed":false,"name":"head","type":"address"},{"indexed":false,"name":"next","type":"address"},{"indexed":false,"name":"reward","type":"uint256"}],"name":"AddResponse","type":"event"}]
```
