//
// usage: node contract getState Teller
//
module.exports = (contract,params,args)=>{
  contract.methods.state().call().then((state)=>{
    console.log("STATE:"+state)
  })
}
