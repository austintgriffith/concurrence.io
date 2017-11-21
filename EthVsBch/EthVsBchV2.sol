pragma solidity ^0.4.11;

/*
A simple 'request oracle client' that needs to know the price of Eth and Bch
*/

contract EthVsBch {

    //string to hold source address of oracle
    address public source;

    function EthVsBch(address _source) {
      source = _source;
    }

    //anyone can get any price by symbol
    function whoIsWinning() constant returns (string,uint) {
      Store store = Store(source);

      //--- new piece that checks if the data is old
      uint lastUpdate = store.lastUpdate();
      if( lastUpdate < block.number-10 ){
        return ("OUTOFDATE",0);
      }

      uint priceOfEth = store.getPrice("ETH");
      uint priceOfBch = store.getPrice("BCH");
      if( priceOfEth > priceOfBch ){
        return ("ETH",priceOfEth);
      }else if ( priceOfEth < priceOfBch ){
        return ("BCH",priceOfBch);
      }else{
        return ("TIE!",priceOfEth);
      }
    }
}

//simple Store interface with just the function we need
contract Store{
  function getPrice(bytes32 _symbol) constant returns (uint) {}
  uint public lastUpdate;//--new public uint
}
