pragma solidity ^0.4.11;

contract ExternalContract{ function __callback(uint _number,string _name) {} }

contract LinkedList {

  event AddEntry(bytes32 head,uint number,string name,bytes32 next);

  uint public length = 0;//also used as nonce

  struct Object{
    bytes32 next;
    uint number;
    string name;
  }

  bytes32 public head;
  mapping (bytes32 => Object) public objects;

  function LinkedList(){}

  function addEntry(uint _number,string _name) public returns (bool){
    Object memory object = Object(head,_number,_name);
    bytes32 id = sha3(object.number,object.name,now,length);
    objects[id] = object;
    head = id;
    length = length+1;
    AddEntry(head,object.number,object.name,object.next);
  }

  // --------- total stuff

  function total() public constant returns (uint) {
    bytes32 current = head;
    uint totalCount = 0;
    while( current != 0 ){
      totalCount = totalCount + objects[current].number;
      current = objects[current].next;
    }
    return totalCount;
  }

  function setTotal() public returns (bool) {
    writtenTotal = total();
    return true;
  }

  function resetTotal() public returns (bool) {
    writtenTotal = 0;
    return true;
  }

  uint public writtenTotal;

}
