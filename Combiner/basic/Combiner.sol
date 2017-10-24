pragma solidity ^0.4.11;

import 'Addressed.sol';

contract Token { function balanceOf(address _owner) public constant returns (uint256 balance) { } }
contract Responses{
  mapping (bytes32 => bytes32) public heads;
  function getResponse(bytes32 id) public constant returns (address,bytes32,bytes32) {}
}

contract Combiner is Addressed{

  function Combiner(address _mainAddress) Addressed(_mainAddress) { }

  event Combine(address sender, bytes32 _request);

  enum Mode {
    INIT,
    COUNTING,
    DONE
  }
          //req id            //result    //amount of token
  mapping (bytes32 => mapping (bytes32 => uint256)) public staked;

          //req id   //current pointer
  mapping ( bytes32 => bytes32 ) public current;

          //req id   //current mode
  mapping (bytes32 => Mode ) public mode;

  function combine(bytes32 _request) public constant returns (bytes32) {
    Main mainContract = Main(mainAddress);
    Token tokenContract = Token(mainContract.getContract('Token'));
    Responses responsesContract = Responses(mainContract.getContract('Responses'));
    bytes32 current = responsesContract.heads(_request);
    bytes32 bestResult;


    while(current!=0){
      address miner;
      bytes32 result;
      staked[current]=10;
      (miner,result,current) = responsesContract.getResponse(current);
      bestResult=result;
    }
    return bestResult;
  }

}
