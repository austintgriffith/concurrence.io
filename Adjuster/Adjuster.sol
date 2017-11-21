pragma solidity ^0.4.11;

import "Simple.sol";

contract Adjuster {

    address public owner;

    function Adjuster() {
      owner = msg.sender;
    }

    /*
      read the current value of the Simple count
      then, add the correct amount to get to _target
      if _target < count, overflow uint8
    */
    function adjustTo(address _contractAddress,uint8 _target) public returns (uint8) {
      //make sure the sender is the owner, only that address can use the Adjuster
      require(msg.sender == owner);
      //load the Simple contract based on the _contractAddress supplied
      Simple simpleContract = Simple(_contractAddress);
      //get the currentCount frim the Simple contract
      uint8 currentCount = simpleContract.count();
      //if the count is right already just return 0
      if(currentCount == _target) return 0;
      //adjust the Count as needed
      uint8 amount;
      if(currentCount < _target){
        amount = _target-currentCount;
      }else{
        amount = 255-(currentCount-_target-1);
      }
      //add the amount
      simpleContract.add(amount);
      //trigger the event
      Adjusted(_contractAddress,_target,amount);
      //return the amount added
      return amount;
    }

    event Adjusted(address _contractAddress,uint8 _target,uint8 _amount);
}
