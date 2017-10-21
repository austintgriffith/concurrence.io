pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'Addressed.sol';

contract Responses is HasNoEther, Addressed {

  function Responses(address _mainAddress) Addressed(_mainAddress) { }

  event AddResponse(address sender, bytes32 id, string response, uint256 count);

  uint256 public count = 0;

  struct Response{
    address miner;
    string response;
    bytes32 next;
  }

  mapping (bytes32 => bytes32) public heads;
  mapping (bytes32 => Response) public responses;

  function addResponse(bytes32 _request,string _response) public returns (bool) {

    Response memory response = Response(msg.sender,_response,heads[_request]);

    bytes32 id = sha3(now,count,response.miner,response.response);
    responses[id] = response;
    heads[_request] = id;

    AddResponse(msg.sender,id,responses[id].response,count);

    count=count+1;

    return true;
  }
}
