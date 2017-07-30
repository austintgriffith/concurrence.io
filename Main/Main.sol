pragma solidity ^0.4.0;

contract Auth {
    address owner;
    mapping ( address => uint8 ) public permission;
    function Auth() {}
    function setPermission( address _address , uint8 _permission) returns (bool) {}
    function getPermission( address _address) constant returns (uint8) {}
}



contract Main {
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
      //check to see if you have permission
      Auth auth = Auth(contracts[0]);
      //must have auth level of at least 200
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
