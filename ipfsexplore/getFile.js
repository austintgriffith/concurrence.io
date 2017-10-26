const IPFS = require('ipfs')
const ipfs = new IPFS()
const fs = require("fs")
ipfs.on('ready', () => {
  let multihashStr = process.argv[2];
  console.log("Getting "+multihashStr)
  ipfs.files.get(multihashStr, function (err, stream) {
    stream.on('data', (file) => {
      file.content.pipe(process.stdout)
    })
  })
})
ipfs.on('error', (err) => {
  console.log("ipfs error:",err)
})
