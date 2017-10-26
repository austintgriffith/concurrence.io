const IPFS = require('ipfs')
const ipfs = new IPFS()
const fs = require("fs")

let reallyReady = false;

ipfs.on('ready', () => {
  setInterval(()=>{
    ipfs.swarm.peers(function (err, peerInfos) {
      if (err) {
        throw err
      }
      //console.log(peerInfos.length)
      if(!reallyReady && peerInfos.length>0){
        reallyReady=true;
        console.log("really ready?")
        setTimeout(ready,30000);
      }
    })
  },1000)



})
ipfs.on('error', (err) => {
  console.log("ipfs error:",err)
})


function ready(){
  let multihashStr = process.argv[2];
  console.log("Getting "+multihashStr)
  ipfs.files.get(multihashStr, function (err, stream) {
    if(err){
      console.log(err)
    }else{
      stream.on('data', (file) => {
        file.content.pipe(process.stdout)
      })
    }
  })
}
