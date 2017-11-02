pragma solidity ^0.4.11;

contract Token is StandardToken, Ownable, HasNoEther, Contactable, Addressed {

  string public constant name = "Concurrence";
  string public constant symbol = "CCCE";
  uint8 public constant decimals = 9;
  uint256 public constant INITIAL_SUPPLY = 10**18;

  function Token(address _mainAddress) Addressed(_mainAddress) {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

  //event debug(address sender, uint256 balance, bytes32 request, uint256 amount);
  event Reserve(address sender, bytes32 request, uint256 value, uint256 total);

  mapping (bytes32 => uint256) public reserved;

  //reservations are one directional; once they go in, the only way
  //to get them out is through mining and consensus
  function reserve(bytes32 _request, uint256 _value) public returns (bool) {
    require(_value <= balances[msg.sender]);
    balances[msg.sender] = balances[msg.sender].sub(_value);
    reserved[_request] = reserved[_request].add(_value);
    Reserve(msg.sender,_request,_value,reserved[_request]);
    return true;
  }

  function reward(bytes32 _request, address _miner, uint256 _value) public returns (bool) {
    Main mainContract = Main(mainAddress);
    Requests requestsContract = Requests(mainContract.getContract('Requests'));
    //the only account that can move the reserved token around
    //is the combiner defined in the request
    require(msg.sender == requestsContract.getCombiner(_request));
    require(_value <= reserved[_request]);
    reserved[_request] = reserved[_request].sub(_value);
    balances[_miner] = balances[_miner].add(_value);
    return true;
  }

  event Stake(address indexed sender, bytes32 indexed request, bytes32 indexed response, uint256 value, uint256 total);
  //event Unstake(address indexed sender, bytes32 indexed response, uint256 value, uint256 total);

  mapping (address => mapping (bytes32 => mapping (bytes32 => uint256))) public staked;

  function stake(bytes32 _request,bytes32 _response, uint256 _value) public returns (bool) {

    //TODO for now set it up so only the response sender can stake token behind it
    // this is because if another account stakes on a response they wont ever
    // get their token back

    require(_value <= balances[msg.sender]);
    balances[msg.sender] = balances[msg.sender].sub(_value);
    staked[msg.sender][_request][_response] = staked[msg.sender][_request][_response].add(_value);
    Stake(msg.sender,_request,_response,_value,staked[msg.sender][_request][_response]);
    return true;
  }

  function release(bytes32 _request, bytes32 _response, address _miner, uint256 _value) public returns (bool) {
    Main mainContract = Main(mainAddress);
    Requests requestsContract = Requests(mainContract.getContract('Requests'));
    //the only account that can move the staked token around
    //is the combiner defined in the request
    require(msg.sender == requestsContract.getCombiner(_request));
    require(_value <= staked[_miner][_request][_response]);
    staked[_miner][_request][_response] = staked[_miner][_request][_response].sub(_value);
    balances[_miner] = balances[_miner].add(_value);
    return true;
  }

  function punish(bytes32 _request, bytes32 _response, address _miner, uint256 _value, address _to) public returns (bool) {
    Main mainContract = Main(mainAddress);
    Requests requestsContract = Requests(mainContract.getContract('Requests'));
    //the only account that can move the staked token around
    //is the combiner defined in the request
    require(msg.sender == requestsContract.getCombiner(_request));
    require(_value <= staked[_miner][_request][_response]);
    staked[_miner][_request][_response] = staked[_miner][_request][_response].sub(_value);
    balances[_to] = balances[_to].add(_value);
    return true;
  }

}

contract Requests {function getCombiner(bytes32 _id) public constant returns (address) {}}

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/ownership/Contactable.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';
import 'Addressed.sol';
