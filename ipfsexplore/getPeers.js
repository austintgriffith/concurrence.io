//https://github.com/ipfs/js-ipfs
const IPFS = require('ipfs')
const ipfs = new IPFS()
const fs = require("fs")
ipfs.on('ready', () => {
  setInterval(()=>{
    ipfs.swarm.peers(function (err, peerInfos) {
      if (err) {
        throw err
      }
      console.log(peerInfos.length)
    })
  },1000)
})
ipfs.on('error', (err) => {
  console.log("ipfs error:",err)
})
