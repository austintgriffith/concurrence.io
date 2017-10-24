pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'Addressed.sol';

contract Token {
  mapping (bytes32 => uint256) public reserved;
  mapping (address => mapping (bytes32 => mapping (bytes32 => uint256))) public staked;
  function balanceOf(address _owner) public constant returns (uint256 balance) { }
  function reward(bytes32 _request, address _miner, uint256 _value) public returns (bool) { }
  function release(bytes32 _request, bytes32 _response, address _miner, uint256 _value) public returns (bool) { }
  function punish(bytes32 _request, bytes32 _response, address _miner, uint256 _value, address _to) public returns (bool) { }
}
contract Responses{
  mapping (bytes32 => bytes32) public heads;
  function getResponse(bytes32 id) public constant returns (address,bytes32,bytes32) {}
}

contract Combiner is Ownable, Addressed{

  function Combiner(address _mainAddress) Addressed(_mainAddress) { }

  //event Debug( address sender, bytes32 request, bytes32 result , uint256 staked );
  event Debug( string debug );
  event DebugGas( uint gas );

  enum Mode {
    INIT,
    COUNTING,
    FEEDBACK,
    CALLOUT,
    DONE
  }

          //req id            //result    //amount of token
  mapping (bytes32 => mapping (bytes32 => uint256)) public staked;
  mapping (bytes32 => mapping (bytes32 => uint32)) public miners;

          //req id   //current pointer
  mapping ( bytes32 => bytes32 ) public current;

          //req id   //current mode
  mapping (bytes32 => Mode ) public mode;

  //req id   //current mode
  mapping (bytes32 => bytes32 ) public bestResult;
  mapping (bytes32 => uint256 ) public mostStaked;
  mapping (bytes32 => uint32 ) public correctMiners;
  mapping (bytes32 => uint256 ) public reward;


  function combine(bytes32 _request) public constant returns (bytes32) {

    Main mainContract = Main(mainAddress);
    Token tokenContract = Token(mainContract.getContract('Token'));
    Responses responsesContract = Responses(mainContract.getContract('Responses'));
    address miner;
    bytes32 result;
    bytes32 next;

    if(mode[_request] == Mode.INIT){
      current[_request] = responsesContract.heads(_request);
      mode[_request] = Mode.COUNTING;
    }

    if(mode[_request] == Mode.COUNTING){
      //we want to drop out if gas is less than a safe amount to iterate again
      while(current[_request]!=0 && msg.gas>50000){

        (miner,result,next) = responsesContract.getResponse(current[_request]);
        //keep track of total staked amounts for all the different results
        staked[_request][result] += tokenContract.staked(miner,_request,current[_request]);
        miners[_request][result]++;
        //keep track of running best and how much is staked to it
        if(staked[_request][result]>mostStaked[_request]){
          mostStaked[_request] = staked[_request][result];
          bestResult[_request] = result;
          correctMiners[_request] = miners[_request][result];
        }
        current[_request] = next;
      }

      if( current[_request]==0 ){
        mode[_request] = Mode.DONE;
        //determine the reward split
        reward[_request] = tokenContract.reserved(_request)/correctMiners[_request];
        if(reward[_request]<1) reward[_request]=1;
        //reset the pointer back to the head so we can iterate through again
        current[_request] = responsesContract.heads(_request);
      }

    }

    if(mode[_request] == Mode.FEEDBACK && msg.gas>90000){
      Debug("feedback start");
      DebugGas(msg.gas);

      while(current[_request]!=0 && msg.gas>90000){

        Debug("feedback loop");
        DebugGas(msg.gas);

        (miner,result,next) = responsesContract.getResponse(current[_request]);
        uint256 amountStaked;
        if( bestResult[_request] == result ){
          //they got it right
          //reward with their split of the bounty
          if( tokenContract.reserved(_request) >= reward[_request] ){
            tokenContract.reward(_request,miner,reward[_request]);
          }
          //return to them all of tokenContract.staked(miner,current[_request]);
          amountStaked = tokenContract.staked(miner,_request,current[_request]);
          tokenContract.release(_request,current[_request],miner,amountStaked);
        }else{
          //they got it wrong
          //take a 10th of what they staked tokenContract.staked(miner,current[_request])
          //I guess this can go back to the owner for now
          //but eventually that should go somewhere better
          amountStaked = tokenContract.staked(miner,_request,current[_request]);
          uint256 punishment = amountStaked/10;
          if(punishment<1) punishment=1;
          amountStaked-=punishment;
          tokenContract.punish(_request,current[_request],miner,punishment,owner);
          tokenContract.release(_request,current[_request],miner,amountStaked);
          //return the remaining amount of tokenContract.staked(miner,current[_request]); to them
        }

        current[_request] = next;
      }

      if( current[_request]==0 ){
        mode[_request] = Mode.DONE;
        //reset the pointer back to the head so we can iterate through again
        current[_request] = responsesContract.heads(_request);
      }

    }

  }

}
