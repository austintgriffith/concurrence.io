pragma solidity ^0.4.11;

contract Auth { mapping ( address => mapping ( bytes32 => bool ) ) public permission; }
contract Main { function getContract(bytes32 _name) constant returns (address) {} }

contract Addressed {

  address public mainAddress;

  function Addressed(address _mainAddress) {
    mainAddress=_mainAddress;
  }

  function setMainAddress(address _mainAddress){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContract('Auth'));
    if( auth.permission(msg.sender,'setMainAddress') ){
      mainAddress=_mainAddress;
    }
  }

}
