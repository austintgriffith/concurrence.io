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
