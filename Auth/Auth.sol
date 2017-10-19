pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';

contract Auth is Ownable, HasNoEther  {

    event SetPermission( address _sender, address _address, bytes32 _permission, bool _value );

    mapping ( address => mapping ( bytes32 => bool ) ) public permission;

    function Auth() {
        permission[owner]['setPermission'] = true;
        permission[owner]['setContract'] = true; //Main.sol
        permission[owner]['setMainAddress'] = true; //Token.sol and Requests.sol
        permission[owner]['addRequest'] = true; //Requests.sol
    }

    function setPermission( address _address , bytes32 _permission, bool _value) public returns (bool) {
        require( permission[msg.sender]['setPermission'] );
        require( _address!=owner || _permission!='setPermission');
        permission[_address][_permission] = _value;
        SetPermission(msg.sender,_address,_permission,_value);
        return true;
    }

}
