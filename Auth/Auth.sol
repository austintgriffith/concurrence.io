pragma solidity ^0.4.0;
contract Auth {
    address owner;
    mapping ( address => uint8 ) public permission;
    function Auth() {
        owner=msg.sender;
        permission[owner] = 255;
    }
    function setPermission( address _address , uint8 _permission) returns (bool) {
        if( permission[msg.sender]>=255 && _address!=owner ){
            permission[_address] = _permission;
            return true;
        }
        revert();
    }
    function getPermission( address _address) constant returns (uint8) {
        return permission[_address];
    }
}
