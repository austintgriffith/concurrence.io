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

  function Requests(address _mainAddress) {
    mainAddress=_mainAddress;
  }

  function getUrl() constant returns (string){
    return url;
  }

  function submitUrl(string _url) returns (bool){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    if( auth.getPermission(msg.sender)>=32 ){
      url = _url;
      return true;
    }
    revert();
  }

  function submitResult(string _result) returns (bool){
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContractAddress(0));
    if( auth.getPermission(msg.sender)>=5 && !claimed){
      result = _result;
      miner = msg.sender;
      claimed = true;
      return true;
    }
    revert();
  }

  function getResult() constant returns (string,address){
    return (result,miner);
  }

  /*
    struct Request {
      string url;
      uint count;
      address owner;
      uint reward;
      uint32 processor;
    }

    mapping(bytes32 => Request) public requests;

    function submitRequest(bytes32 _id,string _url,uint _count,address _owner,uint _reward) returns (bool){
      Main main = Main(mainAddress);
      Auth auth = Auth(main.getContractAddress(0));
      if( auth.getPermission(msg.sender)>=32 ){
        requests[_id].url = _url;
        requests[_id].count = _count;
        requests[_id].owner = _owner;
        requests[_id].reward = _reward;
      }
      revert();
    }

    function getRequest(bytes32 _id) constant returns (string) {

      return requests[_id].url;
    }*/


  //function getRequest() constant returns (string) {
  //  return request;
  //}


  function testGet(bytes32 _id) constant returns (bytes32) {
    return _id;
  }
}
