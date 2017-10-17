pragma solidity ^0.4.0;

/*
  >= 240 give permissions to other addresses (Auth admin)
  >= 200 setContractAddress (Main admin)
*/

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';

contract Auth is Ownable, HasNoEther  {

    event SetPermission( address _sender, address _address , uint8 _permission );

    mapping ( address => uint8 ) public permission;

    function Auth() {
        permission[owner] = 255;
    }

    function setPermission( address _address , uint8 _permission) {
        require( permission[msg.sender] >= 240 );
        require( permission[msg.sender] >= _permission );
        require( _address != owner );
        require( _address != msg.sender );
        permission[_address] = _permission;
        SetPermission(msg.sender,_address,_permission);
    }


}
