pragma solidity ^0.4.11;

contract Main is HasNoEther, Contactable, Predecessor {

    event SetContract(bytes32 name,address contractAddress,address whoDid);

    mapping(bytes32 => address) contracts;

    function Main(address _authContract) {
      contracts['Auth']=_authContract;
    }

    function setContract(bytes32 _name,address _contract) public returns (bool) {
      Auth authContract = Auth(contracts['Auth']);
      require( authContract.getPermission(msg.sender,'setContract') );
      contracts[_name]=_contract;
      SetContract(_name,_contract,msg.sender);
      return true;
    }

    function getContract(bytes32 _name) public constant returns (address) {
      if(descendant!=address(0)) {
        return Main(descendant).getContract(_name);
      }else{
        return contracts[_name];
      }
    }

}

contract Auth { function getPermission( address _account , bytes32 _permission) constant public returns (bool) { } }

import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/ownership/Contactable.sol';
import 'Predecessor.sol';
