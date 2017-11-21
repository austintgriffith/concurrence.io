pragma solidity ^0.4.11;

contract Simple {

    uint8 public count;

    function Simple(uint8 _amount) {
      count = _amount;
    }

    function add(uint8 _amount) {
        count += _amount;
    }
}
