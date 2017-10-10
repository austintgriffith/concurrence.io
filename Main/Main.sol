pragma solidity ^0.4.0;

import "Auth.sol";

contract Main {

    /*
    0 - Auth Contract
    10 - Requests Contract
    20 - Token Contract
    (see wireupAllContracts.js)
    */

    mapping(uint32 => address) public contracts;

    function Main(address _authContractAddress) {
      contracts[0]=_authContractAddress;
    }

    event SetContractAddress(
            uint32 _id,
            address _address
    );

    function setContractAddress(uint32 _id,address _address) returns (bool){
      SetContractAddress(_id,_address);
      Auth auth = Auth(contracts[0]);
      if( auth.getPermission(msg.sender) >= 200 ){
          contracts[_id]=_address;
          return true;
      }
      revert();
    }

    function getContractAddress(uint32 _id) constant returns (address){
        return contracts[_id];
    }

}
