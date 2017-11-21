//https://github.com/ipfs/js-ipfs
const IPFS = require('ipfs')
const ipfs = new IPFS()
const fs = require("fs")
ipfs.on('ready', () => { 
  ipfs.swarm.connect(process.argv[2], function (err) {
    if (err) {
      throw err
    }
    console.log("Connected?")
    let multihashStr = process.argv[3];
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
  })
})
ipfs.on('error', (err) => {
  console.log("ipfs error:",err)
})
