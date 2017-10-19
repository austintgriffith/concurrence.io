pragma solidity ^0.4.11;

contract LinkedList {

  event AddNameAttempt(address sender, uint number);
  event AddName(uint number,address head, address next);

  struct Number{
    address next;
    uint number;
  }

  address public head;
  mapping (address => Number) public numbers;

  function LinkedList(){

  }

  function addNumber(uint _number) public returns (bool){
    AddNameAttempt(msg.sender,_number);
    require(!numberExists(_number));
    //Number number = Number(head,_number);
    //head = msg.sender
  }

  function numberExists(uint _number) public constant returns (bool) {
    address current = head;
    while( current != address(0) ){
      if(numbers[current].number == _number) return true;
      current = numbers[current].next;
    }
    return false;
  }

}
