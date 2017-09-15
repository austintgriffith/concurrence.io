pragma solidity ^0.4.0;

import "Auth.sol";
import "Main.sol";
//import "Freezable.sol";
//import "Descendant.sol";
import "Token.sol";


//long json data string instead of _url


//contract Requests is Freezable,Descendant {
contract Requests {

  address public mainAddress;
  bool public frozen;

  function Requests(address _mainAddress) {
    mainAddress=_mainAddress;
    //setAncestor(_ancestor);
  }

  function setMainAddress(address _mainAddress){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    if( auth.isOwner(msg.sender) ){
      mainAddress=_mainAddress;
    }
  }

  ///// Request ----------------------------------------------
  struct Request{
    string url;//ex "http://ifconfig.co"
    address combiner;//ex 3 (this would mean contract 103)
  }

  mapping (bytes32 => Request) public requests;
  ///// ======= ----------------------------------------------
  event ErrorString(string _str);
  event AddRequest(address _sender,string _id,address _combiner,uint _coin, string _url);
  event AttemptAddRequest(address _sender,string _id,address _combiner,uint _coin, string _url);

  ///// request add  --------------------------------------------------
  function addRequest(string _id, address _combiner, uint _coin, string _url) returns (bool){
    if(frozen) return false;
    AttemptAddRequest(msg.sender,_id,_combiner,_coin,_url);
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    Token token = Token(main.getContractAddress(20));
    //right now you need at least 32 auth level to add requests...
    if( auth.getPermission(msg.sender)>=32 ){
      bytes32 __id = stringToBytes32(_id);
      if( token.reserve(msg.sender,_combiner,__id,_coin) ){

        requests[__id].url=_url;
        requests[__id].combiner=_combiner;

        AddRequest(msg.sender,_id,_combiner,_coin,_url);
        return true;
      }else{
        ErrorString("Failed to reserve!");
        return false;
      }
    }else{
      ErrorString("Failed to get permission!");
      return false;
    }
  }

  function getRequest(string _id) constant returns (uint,string,address){
    bytes32 __id = stringToBytes32(_id);
    Main main = Main(mainAddress);
    Token token = Token(main.getContractAddress(20));
    return ( token.getReserved(requests[__id].combiner,__id), requests[__id].url, requests[__id].combiner );
  }
  ///// === --------------------------------------------------

  //I think this should be made "internal"
  function stringToBytes32(string memory source) returns (bytes32) {
    bytes32 result;
    assembly {
        result := mload(add(source, 32))
    }
    return result;
  }

}
