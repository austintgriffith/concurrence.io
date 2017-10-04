pragma solidity ^0.4.0;

contract Example {

    //construct
  function Example() {}

    //request
  mapping (bytes32 => string) public requests;

  function addRequest(bytes32 _id, string _url) returns (bool){
      requests[_id]=_url;
      AddRequest(msg.sender,_id,requests[_id]);
  }
  event AddRequest(address _sender,bytes32 _id, string _url);

    //response
  mapping(bytes32 => uint ) public responses;

  function addResponse(bytes32 _id,uint _result) returns (bool){
      responses[_id]=_result;
      AddResponse(msg.sender,_id,responses[_id]);
  }
  event AddResponse(address _sender,bytes32 _id,uint _result);

  function getResponse(bytes32 _id) returns (uint){
      return responses[_id];
  }

}
