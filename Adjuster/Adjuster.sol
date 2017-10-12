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
    function adjustTo(address _contractAddress,uint8 _target) returns (bool) {
      //make sure only the owner can run an adjustment
      if(msg.sender != owner) return false;
      //load the Simple contract using the supplied address
      Simple simpleContract = Simple(_contractAddress);


      
    }
}
