pragma solidity ^0.4.11;

contract Payable {
  address public owner;

  function Payable() {
    owner = msg.sender;
  }

  function deposit() payable returns (bool) {
    Deposit(msg.sender,msg.value);
    return true;
  }
  event Deposit(address _sender,uint _value);

  function withdraw(uint _amount) returns (bool) {
    if(msg.sender==owner){
      msg.sender.transfer(_amount);
      return true;
    }
    return false;
  }

}
