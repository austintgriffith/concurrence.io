pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/ownership/Contactable.sol';
import 'Predecessor.sol';

contract Auth { mapping ( address => mapping ( bytes32 => bool ) ) public permission; }

contract Main is Ownable, HasNoEther, Contactable, Predecessor {

    event SetContract(bytes32 _name,address _address);

    mapping(bytes32 => address) contracts;

    function Main(address _authContract) {
      contracts['Auth']=_authContract;
    }

    function setContract(bytes32 _name,address _address){
      Auth authContract = Auth(contracts['Auth']);
      require( authContract.permission(msg.sender,'setContract') );
      contracts[_name]=_address;
      SetContract(_name,_address);
    }

    function getContract(bytes32 _name) constant returns (address) {
      if(descendant!=address(0)) {
        return Main(descendant).getContract(_name);
      }else{
        return contracts[_name];
      }
    }

}
