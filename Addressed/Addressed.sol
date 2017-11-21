pragma solidity ^0.4.11;

contract Addressed {

  address public mainAddress;

  function Addressed(address _mainAddress) {
    mainAddress=_mainAddress;
  }

  function setMainAddress(address _mainAddress){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContract('Auth'));
    if( auth.getPermission(msg.sender,'setMainAddress') ){
      mainAddress=_mainAddress;
    }
  }

}

contract Auth { function getPermission( address _account , bytes32 _permission) constant public returns (bool) { } }
contract Main { function getContract(bytes32 _name) constant returns (address) {} }
