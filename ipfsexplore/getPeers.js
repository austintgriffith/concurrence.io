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
      console.log(peerInfos)
    })
  },5000)
})
ipfs.on('error', (err) => {
  console.log("ipfs error:",err)
})
