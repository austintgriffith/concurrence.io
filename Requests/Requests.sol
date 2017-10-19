pragma solidity ^0.4.0;

import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/ownership/Contactable.sol';
import 'Addressed.sol';

contract Requests is HasNoEther, Contactable, Addressed {

  event ErrorString(string _str);
  event AddRequest(address _sender, bytes32 _id, address _combiner, string _request, bytes32 _flavor);
  event AttemptAddRequest(address _sender, bytes32 _id, address _combiner, string _url, bytes32 _flavor);

  struct Request{
    address combiner;
    string request;
    bytes32 flavor;
  }

  mapping (bytes32 => Request) public requests;

  function addRequest(bytes32 _id, address _combiner, string _request, bytes32 _flavor) public returns (bool) {
    AttemptAddRequest(msg.sender,_id,_combiner,_request,_flavor);
    if(requests[_id].combiner != address(0) || _combiner==address(0)){
      ErrorString("Request already exists");
      return false;
    }
    Main main = Main(mainAddress);
    Auth auth = Auth(main.getContract('Auth'));
    if( auth.permission(msg.sender,"addRequest") ){
      requests[_id].combiner=_combiner;
      requests[_id].request=_request;
      requests[_id].flavor=_flavor;
      AddRequest(msg.sender,_id,requests[_id].combiner,requests[_id].request,requests[_id].flavor);
      return true;
    }else{
      ErrorString("Failed to get permission");
      return false;
    }
  }

}
