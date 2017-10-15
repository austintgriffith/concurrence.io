pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/lifecycle/Pausable.sol';
import "Predecessor.sol";

contract Store is Ownable,Pausable,Predecessor {

    //string to hold source url of price information for reference
    string public source;
    //prices mapped by SYMBOL => price in USD
    //we could make this public but it's better
    //to have getPrice be the access method so
    //we can forward the on to the descendant 
    mapping (bytes32 => uint) price;

    function Store(string _source) {
      source = _source;
    }

    //only the owner can set prices by symbol
    function setPrice(bytes32 _symbol,uint _price) onlyOwner whenNotPaused {
      //setPrice should never get called once a descendant is set
      assert(descendant==address(0));
      price[_symbol]=_price;
    }

    //anyone can get any price by symbol
    function getPrice(bytes32 _symbol) constant returns (uint) {
      //if there is a descendant, pass the call on
      if(descendant!=address(0)) return Store(descendant).getPrice(_symbol);
      else return price[_symbol];
    }
}
