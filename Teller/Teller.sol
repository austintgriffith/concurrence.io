pragma solidity ^0.4.11;

//contract ExternalContract{ function __callback(uint _number,string _name) {} }

contract LinkedList {
  struct Object{ bytes32 next;uint number;bytes32 name;}
  bytes32 public head;
  mapping (bytes32 => Object) public objects;
  function total() public constant returns (uint) {}
  function getEntry(bytes32 _id) public returns (bytes32,uint,bytes32){}
}

contract Teller {

  uint16 public quorum = 300;
  bytes32 public winningName;
  uint public winningVotes;

  enum States {
        WaitingForQuorum,
        CountingVotes,
        ElectionFinished,
        CalledBack
  }

  States public state = States.WaitingForQuorum;

  address public owner;

  function Teller(){ owner=msg.sender; }

  bytes32 public currentPointer;
  mapping (bytes32 => uint) public totals;
  uint public counted=0;

  function countVotes(address _linkedListAddress) public returns (bool){
    require(owner==msg.sender);
    LinkedList linkedList = LinkedList(_linkedListAddress);
    if( state == States.WaitingForQuorum ){
      require( linkedList.total() >= quorum );
      state = States.CountingVotes;
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
      }
    }else if( state == States.ElectionFinished ){
      state = States.CalledBack;
      //normally you would call back to a contract that needed those results if they
      //aren't coming here to get the results
      //contract ExternalContract{ function __callback(uint _number,string _name) {} }
    }else{
      revert();
    }
  }
}
