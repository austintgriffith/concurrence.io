//https://github.com/ipfs/js-ipfs
const IPFS = require('ipfs')
const ipfs = new IPFS()
const fs = require("fs")
ipfs.on('ready', () => {
  let filepath = "somefile.txt"
  console.log("Adding "+filepath)
  const files = [
    {
      path: filepath,
      content: fs.createReadStream(filepath)
    }
  ]

  ipfs.files.add(files, function (err, files) {
    // 'files' will be an array of objects
    console.log("ADDED!",err,files)
  })
})
ipfs.on('error', (err) => {
  console.log("ipfs error:",err)
})
