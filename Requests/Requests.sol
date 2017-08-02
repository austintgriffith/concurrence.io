pragma solidity ^0.4.0;

import "Auth.sol";
import "Main.sol";
import "Freezable.sol";

contract Requests is Freezable{
  address public mainAddress;
  string public url;
  string public result;
  address public miner;
  bool public claimed = false;

  function stringToBytes32(string memory source) returns (bytes32) {
    bytes32 result;
    assembly {
        result := mload(add(source, 32))
    }
    return result;
  }

  function Requests(address _mainAddress) {
    mainAddress=_mainAddress;
  }

  struct Request{
    string url;
    string result;
    address miner;
    bool claimed;
  }

  mapping (bytes32 => Request) public requests;

  function setUrl(string _id,string _url) returns (bool){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    if( auth.getPermission(msg.sender)>=32 ){
      requests[stringToBytes32(_id)].url=_url;
      return true;
    }
    revert();
  }

  function getUrl(string _id) constant returns (string){
    return requests[stringToBytes32(_id)].url;
  }

  function setResult(string _id,string _result) returns (bool){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    if( auth.getPermission(msg.sender)>=5 && !claimed){
      bytes32 i = stringToBytes32(_id);
      requests[i].result=_result;
      requests[i].miner=msg.sender;
      requests[i].claimed=true;
      return true;
    }
    revert();
  }

  function getResult(string _id) constant returns (string,address){
    bytes32 i = stringToBytes32(_id);
    return (requests[i].result,requests[i].miner);
  }

}
