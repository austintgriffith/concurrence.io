pragma solidity ^0.4.0;

import "Auth.sol";
import "Main.sol";

contract Freezable {
  bool public frozen;
  
  address public mainAddress;

  function setMainAddress(address _mainAddress){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    if( auth.isOwner(msg.sender) ){
      mainAddress=_mainAddress;
    }
  }

  function toggle(){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    if( auth.getPermission(msg.sender)>=230 ){
        frozen=!frozen;
    }
  }
}
