pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/ownership/Contactable.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';
import 'Addressed.sol';

contract Token is StandardToken, Ownable, HasNoEther, Contactable, Addressed {

  string public constant name = "Pyth.io";
  string public constant symbol = "PTH";
  uint8 public constant decimals = 18;
  uint256 public constant INITIAL_SUPPLY = 1000000000000;

  function Token(address _mainAddress) Addressed(_mainAddress) {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

  event Reserve(address sender, bytes32 request, uint256 value, uint256 total);

  mapping (bytes32 => uint256) public reserved;

  function reserve(bytes32 _request, uint256 _value) public returns (bool) {
    require(_value <= balances[msg.sender]);
    balances[msg.sender] = balances[msg.sender].sub(_value);
    reserved[_request] = reserved[_request].add(_value);
    Reserve(msg.sender,_request,_value,reserved[_request]);
    return true;
  }

  event Stake(address sender, bytes32 request, uint256 value, uint256 total);
  event Unstake(address sender, bytes32 request, uint256 value, uint256 total);

  mapping (address => mapping (bytes32 => uint256)) public staked;

  function stake(bytes32 _response, uint256 _value) public returns (bool) {
    require(_value <= balances[msg.sender]);
    balances[msg.sender] = balances[msg.sender].sub(_value);
    staked[msg.sender][_response] = staked[msg.sender][_response].add(_value);
    Stake(msg.sender,_response,_value,staked[msg.sender][_response]);
    return true;
  }

  function unstake(bytes32 _response, uint256 _value) public returns (bool) {
    require(_value <= staked[msg.sender][_response]);
    staked[msg.sender][_response] = staked[msg.sender][_response].sub(_value);
    balances[msg.sender] = balances[msg.sender].add(_value);
    Unstake(msg.sender,_response,_value,staked[msg.sender][_response]);
    return true;
  }

}
