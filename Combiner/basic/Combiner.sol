pragma solidity ^0.4.11;

contract Combiner{

    event AddResponseAttempt(address _miner,bytes32 _id,string _result);
    event AddResponse(address _miner,bytes32 _id,string _result,address head, address next);

    struct Response{
        address next;
        address miner;
        string result;
    }

    mapping(bytes32 => address ) public head;
    mapping(bytes32 => mapping (address => Response) ) public responses;

    function Combiner(){}

    function addResponse(bytes32 _id,string _result) public returns (bool){
        AddResponseAttempt(msg.sender,_id,_result);
    }

    function responseExists(bytes32 _id,address _miner) public constant returns (bool) {
      assert(_miner != address(0));
      address current = head[_id];
      while( current != address(0) ){
        if(responses[_id][current].miner == _miner)
        current = responses[_id][current].next;
      }
    }

    //could I create a foreach that runs a function on each element of the linked list
    //https://ethereum.stackexchange.com/questions/3342/pass-a-function-as-a-parameter-in-solidity

}
