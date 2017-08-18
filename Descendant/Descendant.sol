pragma solidity ^0.4.0;

import "Auth.sol";
import "Main.sol";

contract Descendant {

  address public ancestor;
  address public predecessor;
  address public mainAddress;

  function setAncestor(address _ancestor) {
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    if( auth.isOwner(msg.sender) ){
      ancestor=_ancestor;
    }
  }

  function setPredecessor(address _predecessor){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    if( auth.isOwner(msg.sender) ){
      predecessor=_predecessor;
    }
  }
  
}
