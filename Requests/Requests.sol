pragma solidity ^0.4.0;

contract Auth {
    address owner;
    mapping ( address => uint8 ) public permission;
    function Auth() {}
    function setPermission( address _address , uint8 _permission) returns (bool) {}
    function getPermission( address _address) constant returns (uint8) {}
}

contract Freezable {
  bool public frozen;
  address public mainAddress;

  function toggle(){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    if( auth.getPermission(msg.sender)>=230 ){
        frozen=!frozen;
    }
  }
}

contract Main {
    mapping(uint32 => address) public contracts;
    function Main(address _authContractAddress) {}
    function setContractAddress(uint32 _id,address _address) returns (bool){}
    function getContractAddress(uint32 _id) constant returns (address){}
}

contract Requests is Freezable{
  address public mainAddress;
  string public url;
  string public result;
  address public miner;
  bool public claimed = false;

  function stringToBytes32(string memory source) returns (bytes32 result) {
    assembly {
        result := mload(add(source, 32))
    }
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
