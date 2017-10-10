---
title: "Auth Contract"
date: 2017-09-23T17:06:17-06:00
draft: true
---
**Auth** keeps a **permission** *(uint8)* for any **account** *(address)*. Other contracts can use this contract to determine the level of **permission** any **account** has by calling **getPermission(*address*)**. Any account with enough **permission** *(uint8)* can also call **setPermission(*address*,*permission*)**.

```
pragma solidity ^0.4.0;

/*
>=250 withdraw ether sent on accident to contracts
>=240 give permissions to other addresses (Auth admin)
>=200 setContractAddress (Main admin)
>=32 to add a request 
*/

contract Auth {
    address public owner;
    mapping ( address => uint8 ) public permission;

    function Auth() {
        owner=msg.sender;
        permission[owner] = 255;
    }

    event SetPermission( address _sender, address _address , uint8 _permission );

    function setPermission( address _address , uint8 _permission) returns (bool) {
        if( msg.sender==owner || (permission[msg.sender]>=240 && _address!=owner) ){
            permission[_address] = _permission;
            SetPermission(msg.sender,_address,_permission);
            return true;
        }else{
            return false;
        }
    }

    function getPermission( address _address) constant returns (uint8) {
        return permission[_address];
    }

    function isOwner( address _address) constant returns (bool) {
        return (owner==_address);
    }

}

```
Eventually, the **Auth** contract will be extended to allow for more complex governance including voting and signally for specific changes to the system.


Current address:
```
0x4C643328d5395d56004Fe91e7Af9b0dbBdFee40c
```
Current ABI:
```
[{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"permission","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getPermission","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_permission","type":"uint8"}],"name":"setPermission","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_sender","type":"address"},{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_permission","type":"uint8"}],"name":"SetPermission","type":"event"}]
```
