//we need to be able to drain any errant ether
//spread this to all contracts after testing
function withdraw() returns (bool) {
    if ( permission[msg.sender] >= 250 ) {
        if(!msg.sender.send(this.balance)){
          revert();
        }
        return true;
    }else{
      revert();
    }
}
