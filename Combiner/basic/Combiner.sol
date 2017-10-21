pragma solidity ^0.4.11;

contract Combiner{

    function Combiner(){}

    /*

    this will hold the final value of a request once a consensus is reached.

    probably the same function that gets the value will also work through the responses and form the consensus

    the consesus algorithm will be to add up the different responses along with the amount of token staked for each

    there will have to be some quorum of staked token before a final result is stored

    if developers are using oraclize, they have callbacks so you may need to call a callback with the final value too

    also, at the end you can punish incorrectly staked tokens by transferring them to some other account 

    */

}
