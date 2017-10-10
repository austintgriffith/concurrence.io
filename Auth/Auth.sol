pragma solidity ^0.4.0;
contract Auth {
    /*
      permission for any address is tracked by a number from 0 to 255
        **known permissions so far:**
      >=240 give permissions to other addresses (Auth admin)
      >=200 setContractAddress (Main admin)
    */
    address public owner;
    mapping ( address => uint8 ) public permission;
    function Auth() {
        owner=msg.sender;
        permission[owner] = 255;
    }
    event SetPermission( address _sender, address _address , uint8 _permission );
    function setPermission( address _address , uint8 _permission) returns (bool) {
        /*
          The only accounts that can set permissions should be the owner of the auth contract or
          any account that has at least 240 permission AND they aren't trying to set the permission of the owner
        */
        if( msg.sender==owner || (permission[msg.sender]>=240 && _address!=owner) ){
            permission[_address] = _permission;
            SetPermission(msg.sender,_address,_permission);
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
