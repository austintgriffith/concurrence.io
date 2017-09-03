pragma solidity ^0.4.0;

/*
>=240 give permissions to other addresses (Auth admin)
>=200 setContractAddress (Main admin)
*/

contract Auth {
    address public owner;
    mapping ( address => uint8 ) public permission;
    function Auth() {
        owner=msg.sender;
        permission[owner] = 255;
    }
    function setPermission( address _address , uint8 _permission) returns (bool) {
        if( msg.sender==owner || (permission[msg.sender]>=240 && _address!=owner) ){
            permission[_address] = _permission;
            return true;
        }else{
            return false;
        }
    }
    function getPermission( address _address) constant returns (uint8) {
        return permission[_address];
    }

    function isOwner( address _address) constant returns (bool) {
        return (owner==_address);
    }
}
