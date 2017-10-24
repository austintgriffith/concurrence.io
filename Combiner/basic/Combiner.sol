pragma solidity ^0.4.11;

import 'Addressed.sol';

contract Token { function balanceOf(address _owner) public constant returns (uint256 balance) { } }
contract Responses{mapping (bytes32 => bytes32) public heads;function getResponse(bytes32 id) public constant returns (address,string,bytes32) {}}

contract Combiner is Addressed{

  function Combiner(address _mainAddress) Addressed(_mainAddress) { }

  event Combine(address sender, bytes32 _request);

  function combine(bytes32 _request) public constant returns (string) {
    Main mainContract = Main(mainAddress);
    Token tokenContract = Token(mainContract.getContract('Token'));
    Responses responsesContract = Responses(mainContract.getContract('Responses'));
    //bytes32 current = responsesContract.heads(_request);
    string bestResult = "NOTHING";
    //while(current!=0){
    //    address miner;
    //    string result;
        //(miner,result,current) = responsesContract.getResponse(current);
        //bestResult=result;
    //}
    //return bestResult;
    return bestResult;
  }

}
