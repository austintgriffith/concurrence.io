pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';

contract Auth is Ownable, HasNoEther  {

    event SetPermission( address sender, address account, bytes32 permission, bool value );

    mapping ( address => mapping ( bytes32 => bool ) ) public permission;

    function Auth() {
        permission[owner]['setPermission'] = true;
        permission[owner]['setContract'] = true; //Main.sol
        permission[owner]['setMainAddress'] = true; //Token.sol and Requests.sol
        //permission[owner]['addRequest'] = true; //Requests.sol
    }

    function setPermission( address _account , bytes32 _permission, bool _value) public returns (bool) {
        require( permission[msg.sender]['setPermission'] );
        require( _account!=owner || _permission!='setPermission');//don't take setPermission away from owner
        permission[_account][_permission] = _value;
        SetPermission(msg.sender,_account,_permission,_value);
        return true;
    }

}
