---
title: "Token Contract"
date: 2017-09-23T18:28:33-06:00
draft: true
---
The **Token** contract is a simple extension of the StandardToken (ERC20).

```
pragma solidity ^0.4.8;

import "Auth.sol";
import "Main.sol";

contract Token {
     string public constant symbol = "XRC";
     string public constant name = "RequestCoinTest";
     uint8 public constant decimals = 18;
     uint256 _totalSupply = 1000000000000;

     address public owner;
     address public mainAddress;

     event Reserve(address _contract, address indexed _from, address indexed _combiner, bytes32 indexed _id, uint256 _value);
     event Reward(address indexed _combiner, bytes32 indexed _id, address indexed _to, uint256 _value);
     event Revoke(address _contract, address indexed _from, address indexed _combiner, bytes32 indexed _id, uint256 _value);
     event AttemptReserve(address _contract, address indexed _account, address indexed _combiner, bytes32 indexed _id,uint256 _amount);
     event AttemptReward(address _combiner, bytes32 indexed _id, address _miner, uint _amount);
     event AttemptRevoke(address _contract, address indexed _account, address indexed _combiner, bytes32 indexed _id,uint256 _amount);
     event FailedReserve(address _contract, address _validContract, address indexed _account, address indexed _combiner, bytes32 _id, uint256 _amount, uint256 _balance);
     event FailedReward(address indexed _contract, bytes32 indexed _id, address indexed _account, uint256 _amount);
     event FailedRevoke(address _contract, address _validContract, address indexed _account, address indexed _combiner, bytes32 _id, uint256 _amount, uint256 _balance);

     //reservations are tokens held by a combiner's address for a request id to eventually reward miners
     mapping(address => mapping(bytes32 => uint256)) reservations;

     function reserve(address _account,address _combiner,bytes32 _id,uint256 _amount) returns (bool) {
          AttemptReserve(msg.sender,_account,_combiner,_id,_amount);
          Main main = Main(mainAddress);
          //make sure msg.sender is the Requests contract registered in main
          // it is important to make sure only the registered contract can
          // reserve coin on behalf of users
          address requestsContractAddress = main.getContractAddress(10);
          if(msg.sender == requestsContractAddress){
               if (balances[_account] >= _amount
                  && _amount > 0) {
                  balances[_account] -= _amount;
                  reservations[_combiner][_id] += _amount;
                  Reserve(msg.sender, _account, _combiner, _id, _amount);
                  return true;
               }
          }
          FailedReserve(msg.sender,requestsContractAddress,_account,_combiner,_id,_amount,balances[_account]);
          return false;
     }
     function getReserved(address _combiner,bytes32 _id) constant returns (uint){
       return reservations[_combiner][_id];
     }
     function getReservedByString(address _combiner,string _id) constant returns (uint){
       return reservations[_combiner][stringToBytes32(_id)];
     }

     function reward(bytes32 _id,address _miner,uint256 _amount) returns (bool) {
          AttemptReward(msg.sender,_id,_miner,_amount);

          if (reservations[msg.sender][_id] >= _amount
               && _amount > 0) {
               reservations[msg.sender][_id] -= _amount;
               balances[_miner] += _amount;
               Reward(msg.sender,_id,_miner, _amount);
               return true;
          }
          FailedReward(msg.sender,_id,_miner,_amount);
          return false;

     }

     function revoke(address _account,address _combiner,bytes32 _id,uint256 _amount) returns (bool) {
          AttemptRevoke(msg.sender,_account,_combiner,_id,_amount);
          Main main = Main(mainAddress);
          //make sure msg.sender is the Requests contract registered in main
          // it is important to make sure only the registered contract can
          // reserve coin on behalf of users
          address requestsContractAddress = main.getContractAddress(10);
          if(msg.sender == requestsContractAddress){
               if (reservations[_combiner][_id] >= _amount
                  && _amount > 0) {
                  balances[_account] += _amount;
                  reservations[_combiner][_id] -= _amount;
                  Revoke(msg.sender, _account, _combiner, _id, _amount);
                  return true;
               }
          }
          FailedRevoke(msg.sender,requestsContractAddress,_account,_combiner,_id,_amount,balances[_account]);
          return false;
     }

     //Events
     event Transfer(address indexed _from, address indexed _to, uint256 _value);
     event Approval(address indexed _owner, address indexed _spender, uint256 _value);

     // Balances for each account
     mapping(address => uint256) balances;

     // Owner of account approves the transfer of an amount to another account
     mapping(address => mapping (address => uint256)) allowed;

     // Functions with this modifier can only be executed by the owner
     modifier onlyOwner() {
         if (msg.sender != owner) {
             revert();
         }
         _;
     }

     // Constructor
     function Token(address _mainAddress) {
         mainAddress = _mainAddress;
         owner = msg.sender;
         balances[owner] = _totalSupply;
     }

     function totalSupply() constant returns (uint256) {
         return _totalSupply;
     }

     // What is the balance of a particular account?
     function balanceOf(address _owner) constant returns (uint256 balance) {
         return balances[_owner];
     }

     // Transfer the balance from owner's account to another account
     function transfer(address _to, uint256 _amount) returns (bool success) {
         if (balances[msg.sender] >= _amount
             && _amount > 0
             && balances[_to] + _amount > balances[_to]) {
             balances[msg.sender] -= _amount;
             balances[_to] += _amount;
             Transfer(msg.sender, _to, _amount);
             return true;
         } else {
             return false;
         }
     }

     // Send _value amount of tokens from address _from to address _to
     // The transferFrom method is used for a withdraw workflow, allowing contracts to send
     // tokens on your behalf, for example to "deposit" to a contract address and/or to charge
     // fees in sub-currencies; the command should fail unless the _from account has
     // deliberately authorized the sender of the message via some mechanism; we propose
     // these standardized APIs for approval:
     function transferFrom(
         address _from,
         address _to,
         uint256 _amount
     ) returns (bool success) {
         if (balances[_from] >= _amount
             && allowed[_from][msg.sender] >= _amount
             && _amount > 0
             && balances[_to] + _amount > balances[_to]) {
             balances[_from] -= _amount;
             allowed[_from][msg.sender] -= _amount;
             balances[_to] += _amount;
             Transfer(_from, _to, _amount);
             return true;
         } else {
             return false;
         }
     }

     // Allow _spender to withdraw from your account, multiple times, up to the _value amount.
     // If this function is called again it overwrites the current allowance with _value.
     function approve(address _spender, uint256 _amount) returns (bool success) {
         allowed[msg.sender][_spender] = _amount;
         Approval(msg.sender, _spender, _amount);
         return true;
     }

     function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
         return allowed[_owner][_spender];
     }

     ///// === --------------------------------------------------

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
0xf924EeA4074ad3Dc6d9c4CC2Ec2F9f099E0Ec4C8
```
Current ABI:
```
[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"mainAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_account","type":"address"},{"name":"_combiner","type":"address"},{"name":"_id","type":"bytes32"},{"name":"_amount","type":"uint256"}],"name":"reserve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_combiner","type":"address"},{"name":"_id","type":"string"}],"name":"getReservedByString","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"bytes32"},{"name":"_miner","type":"address"},{"name":"_amount","type":"uint256"}],"name":"reward","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_account","type":"address"},{"name":"_combiner","type":"address"},{"name":"_id","type":"bytes32"},{"name":"_amount","type":"uint256"}],"name":"revoke","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_combiner","type":"address"},{"name":"_id","type":"bytes32"}],"name":"getReserved","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"source","type":"string"}],"name":"stringToBytes32","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_mainAddress","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_contract","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_combiner","type":"address"},{"indexed":true,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Reserve","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_combiner","type":"address"},{"indexed":true,"name":"_id","type":"bytes32"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Reward","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_contract","type":"address"},{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_combiner","type":"address"},{"indexed":true,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Revoke","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_contract","type":"address"},{"indexed":true,"name":"_account","type":"address"},{"indexed":true,"name":"_combiner","type":"address"},{"indexed":true,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"AttemptReserve","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_combiner","type":"address"},{"indexed":true,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_miner","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"AttemptReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_contract","type":"address"},{"indexed":true,"name":"_account","type":"address"},{"indexed":true,"name":"_combiner","type":"address"},{"indexed":true,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"AttemptRevoke","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_contract","type":"address"},{"indexed":false,"name":"_validContract","type":"address"},{"indexed":true,"name":"_account","type":"address"},{"indexed":true,"name":"_combiner","type":"address"},{"indexed":false,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"FailedReserve","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_contract","type":"address"},{"indexed":true,"name":"_id","type":"bytes32"},{"indexed":true,"name":"_account","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"FailedReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_contract","type":"address"},{"indexed":false,"name":"_validContract","type":"address"},{"indexed":true,"name":"_account","type":"address"},{"indexed":true,"name":"_combiner","type":"address"},{"indexed":false,"name":"_id","type":"bytes32"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"FailedRevoke","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
```
