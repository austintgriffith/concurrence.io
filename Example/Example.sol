pragma solidity ^0.4.0;
contract Example {

  struct Request{
    string url;
  }

  mapping (bytes32 => Request) public requests;

  function addRequest(string _id, string _url) returns (bool){
      bytes32 __id = stringToBytes32(_id);
      requests[__id].url=_url;
      AddRequest(msg.sender,_id,requests[__id].url);
  }
  event AddRequest(address _sender,string _id, string _url);

  struct Response{
      string result;
  }

  mapping(bytes32 => mapping (address => Response) ) public responses;

  function addResponse(string _id,string _result) returns (bool){
      bytes32 __id = stringToBytes32(_id);
      responses[__id][msg.sender].result=_result;
      AddResponse(msg.sender,_id,responses[__id][msg.sender].result);
  }
  event AddResponse(address _sender,string _id,string _result);

  function Example() {
  }

  function stringToBytes32(string memory source) returns (bytes32) {
    bytes32 result;
    assembly {
        result := mload(add(source, 32))
    }
    return result;
  }
}
