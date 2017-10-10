---
title: "Main Contract"
date: 2017-09-23T18:23:01-06:00
draft: true
---
The **Main** contract keeps a **contract** *(address)* for any **id** *(uint32)*. This allows for old contracts to be replaced with better versions while keeping the main contract address the same.

```
pragma solidity ^0.4.0;

import "Auth.sol";

contract Main {

    /*
    0 - Auth Contract
    10 - Requests Contract
    20 - Token Contract
    (see wireupAllContracts.js)
    */

    mapping(uint32 => address) public contracts;

    function Main(address _authContractAddress) {
      contracts[0]=_authContractAddress;
    }

    event SetContractAddress(
            uint32 _id,
            address _address
    );

    function setContractAddress(uint32 _id,address _address) returns (bool){
      SetContractAddress(_id,_address);
      Auth auth = Auth(contracts[0]);
      if( auth.getPermission(msg.sender) >= 200 ){
          contracts[_id]=_address;
          return true;
      }
      revert();
    }

    function getContractAddress(uint32 _id) constant returns (address){
        return contracts[_id];
    }

}

```
Current address:
```
0x543c78Dd3fF4fAfF6f7Fb7c740F9bF52E4d56e2a
```
Current ABI:
```
[{"constant":true,"inputs":[{"name":"","type":"uint32"}],"name":"contracts","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint32"},{"name":"_address","type":"address"}],"name":"setContractAddress","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint32"}],"name":"getContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_authContractAddress","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_id","type":"uint32"},{"indexed":false,"name":"_address","type":"address"}],"name":"SetContractAddress","type":"event"}]
```
