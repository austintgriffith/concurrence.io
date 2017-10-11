pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Inherit is Ownable{

    string public message;

    function Inherit(string _message) {
      message = _message;
    }

    function setMessage(string _message) onlyOwner {
        message = _message;
    }
}
