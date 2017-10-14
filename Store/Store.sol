pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/lifecycle/Pausable.sol';

contract Store is Ownable,Pausable {

    //string to hold source url of price information for reference
    string public source;
    //prices mapped by SYMBOL => price in USD
    mapping (bytes32 => uint) public price;
    //contract lineage for miners
    address public predecessor;

    function Store(string _source) {
      source = _source;
    }

    //only the owner can set prices by symbol
    function setPrice(bytes32 _symbol,uint _price) onlyOwner whenNotPaused {
      //setPrice should never get called once a predecessor is defined
      //assert(predecessor==address(0));
      price[_symbol]=_price;
    }

    //anyone can get any price by symbol
    function getPrice(bytes32 _symbol) constant returns (uint) {
      //getPrice should never get called once a predecessor is defined 
      //assert(predecessor==address(0));
      return price[_symbol];
    }

}
