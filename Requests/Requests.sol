pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'Addressed.sol';

//contract Token { function balanceOf(address _owner) public constant returns (uint256 balance) { } }

contract Requests is HasNoEther, Addressed {

  function Requests(address _mainAddress) Addressed(_mainAddress) { }

  event AddRequest(address sender, bytes32 id, address combiner, string request, string parser, uint256 count);

  uint256 public count = 0;

  struct Request{
    address combiner;
    string request;
    string parser;
    bool active;
  }

  mapping (bytes32 => Request) public requests;

  function addRequest(address _combiner, string _request, string _parser) public returns (bool) {

    bytes32 id = sha3(now,count,_combiner,_request,_parser);
    assert(!requests[id].active);//a collision should never happen

    //Main mainContract = Main(mainAddress);
    //Token token = Token(mainContract.getContract('Token'));

    //you must have some of the token to add a request
    //require(token.balanceOf(msg.sender)>0);

    requests[id].combiner=_combiner;
    requests[id].request=_request;
    requests[id].parser=_parser;
    requests[id].active=true;

    AddRequest(msg.sender,id,requests[id].combiner,requests[id].request,requests[id].parser,count);

    count=count+1;

    return true;
  }


  function getRequest(bytes32 _id) public constant returns (address,string,string) {
    return (requests[_id].combiner,requests[_id].request,requests[_id].parser);
  }
}
