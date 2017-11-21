pragma solidity ^0.4.11;

contract Teller {

  uint16 public quorum = 400;
  bytes32 public winningName;
  uint public winningVotes;

  enum States {
        WaitingForQuorum,
        CountingVotes,
        ElectionFinished
  }

  States public state = States.WaitingForQuorum;

  function Teller(){ }

  bytes32 public currentPointer;
  mapping (bytes32 => uint) public totals;
  uint public counted=0;

  function countVotes(address _linkedListAddress) public returns (bool){
    LinkedList linkedList = LinkedList(_linkedListAddress);
    if( state == States.WaitingForQuorum ){
      require( linkedList.total() >= quorum );
      state = States.CountingVotes;
      return true;
    }else if( state == States.CountingVotes ){
      if( currentPointer==0 ){
        currentPointer=linkedList.head();
      }
      uint8 limitPerTurn = 4;
      while ( limitPerTurn-- > 0 && currentPointer!=0 ){
        uint thisNumber;
        bytes32 thisName;
        (currentPointer,thisNumber,thisName) = linkedList.getEntry(currentPointer);
        totals[thisName] += thisNumber;
        if(totals[thisName] > winningVotes){
          winningVotes=totals[thisName];
          winningName=thisName;
        }
        counted++;
      }
      if( currentPointer==0 ){
        state = States.ElectionFinished;
        return true;
      }else{
        return false;
      }
    }else{
      revert();
    }
  }
}

//simple interface to the LinkedList
contract LinkedList {
  struct Object{ bytes32 next;uint number;bytes32 name;}
  bytes32 public head;
  mapping (bytes32 => Object) public objects;
  function total() public constant returns (uint) {}
  function getEntry(bytes32 _id) public returns (bytes32,uint,bytes32){}
}
