pragma solidity ^0.4.11;

/*
this is used as an example contract to catch results from the combiner callback 
*/

contract Callback is Addressed {
  function Callback(address _mainAddress) Addressed (_mainAddress) { }

  mapping (bytes32 => bytes32) public results;

  function concurrence(bytes32 requestId,bytes32 result) public {
    Main mainContract = Main(mainAddress);
    Requests requestsContract = Requests(mainContract.getContract('Requests'));
    //make sure only the original combiner can call this
    require(msg.sender == requestsContract.getCombiner(requestId));
    results[requestId] = result;
  }
}

contract Requests {
  function getCombiner(bytes32 _id) public constant returns (address) { }
}

import 'Addressed.sol';
