pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/ownership/Contactable.sol';

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract Main{ function getContract(bytes32 _name) constant returns (address) {} }

contract Token is StandardToken, Ownable, HasNoEther, Contactable  {

  event Reserve(address _contract, address indexed _from, address indexed _combiner, bytes32 indexed _id, uint256 _value);
  event Reward(address indexed _combiner, bytes32 indexed _id, address indexed _to, uint256 _value);
  event Revoke(address _contract, address indexed _from, address indexed _combiner, bytes32 indexed _id, uint256 _value);
  event AttemptReserve(address _contract, address indexed _account, address indexed _combiner, bytes32 indexed _id,uint256 _amount);
  event AttemptReward(address _combiner, bytes32 indexed _id, address _miner, uint _amount);
  event AttemptRevoke(address _contract, address indexed _account, address indexed _combiner, bytes32 indexed _id,uint256 _amount);
  event FailedReserve(address _contract, address _validContract, address indexed _account, address indexed _combiner, bytes32 _id, uint256 _amount, uint256 _balance);
  event FailedReward(address indexed _contract, bytes32 indexed _id, address indexed _account, uint256 _amount);
  event FailedRevoke(address _contract, address _validContract, address indexed _account, address indexed _combiner, bytes32 _id, uint256 _amount, uint256 _balance);


  address public mainAddress;

  function Token(address _mainAddress) {
    mainAddress=_mainAddress;
  }

  //reservations are tokens held by a combiner's address for a request id to eventually reward miners
  mapping(address => mapping(bytes32 => uint256)) reservations;

  function reserve(address _account,address _combiner,bytes32 _id,uint256 _amount) returns (bool) {
       AttemptReserve(msg.sender,_account,_combiner,_id,_amount);
       Main main = Main(mainAddress);
       //make sure msg.sender is the Requests contract registered in main
       // it is important to make sure only the registered contract can
       // reserve coin on behalf of users
       address requestsContractAddress = main.getContract("Requests");
       /*
        the problem here is the Requests contract has the power to
        reserve from anyones account .. instead we need to have the
        account first create an allowance for the Requests contract
        then the Requests contract is only allowed to reserve that much
       */
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
       address requestsContractAddress = main.getContract("Requests");
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


  /*

    we are still missing all the Staking of tokens
    a miner needs to be able to stake an amount of tokens into a request id + combiner

  */
}
