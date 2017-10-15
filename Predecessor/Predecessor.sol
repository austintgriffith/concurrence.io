pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Predecessor is Ownable{
    function Predecessor() {}
    address public descendant;
    function setDescendant(address _descendant) onlyOwner {
      descendant=_descendant;
    }
}
