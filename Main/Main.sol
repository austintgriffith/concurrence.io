pragma solidity ^0.4.0;

contract Auth { mapping ( address => uint8 ) public permission; }

contract Main {

    event SetContractAddress(bytes32 _name,address _address);

    mapping(bytes32 => address) public contracts;

    function Main(address _authContractAddress) {
      contracts['Auth']=_authContractAddress;
    }

    function setContractAddress(bytes32 _name,address _address){
      Auth authContract = Auth(contracts['Auth']);
      require( authContract.permission(msg.sender) >= 200 );
      contracts[_name]=_address;
      SetContractAddress(_name,_address);
    }

}
