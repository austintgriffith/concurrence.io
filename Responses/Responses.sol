pragma solidity ^0.4.11;

contract Responses is HasNoEther, Addressed {

  function Responses(address _mainAddress) Addressed(_mainAddress) { }

  event AddResponse(address indexed sender, bytes32 indexed request, bytes32 indexed id, bytes32 response, uint256 count);

  uint256 public count = 0;

  struct Response{
    address miner;
    bytes32 response;
    bytes32 next;
  }

  mapping (bytes32 => bytes32) public heads;
  mapping (bytes32 => Response) public responses;

  function addResponse(bytes32 _request,bytes32 _response) public returns (bool) {

    //TODO you shouldn't be able to add a response until the combiner is 'open'

    Response memory response = Response(msg.sender,_response,heads[_request]);

    bytes32 id = sha3(now,count,response.miner,response.response);
    responses[id] = response;
    heads[_request] = id;

    AddResponse(msg.sender,_request,id,responses[id].response,count);

    count=count+1;

    return true;
  }

  function getResponse(bytes32 id) public constant returns (address,bytes32,bytes32) {
    return (responses[id].miner,responses[id].response,responses[id].next);
  }

  function reset(bytes32 id) public returns (bool) {
    //TODO
    //THE COMBINER FOR THE REQUEST SHOULD BE ABLE TO RUN THIS
    //IT SHOULD SET THE HEAD FOR THE REQUEST TO 0
  }

}

import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'Addressed.sol';
