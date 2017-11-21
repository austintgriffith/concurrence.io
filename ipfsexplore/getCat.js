const IPFS = require('ipfs')
const ipfs = new IPFS()
const fs = require("fs")
ipfs.on('ready', () => {
  let multihashStr = "QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ/cat.jpg"
  console.log("Getting "+multihashStr)
  ipfs.files.get(multihashStr, function (err, stream) {
    stream.on('data', (file) => {
      var writeStream = fs.createWriteStream(file.path);
      file.content.pipe(writeStream).on('finish', function () {
        console.log("content written to "+file.path)
        ipfs.stop(() => {
          console.log("DONE")
          process.exit(0)
        })
      })
    })
  })
})
ipfs.on('error', (err) => {
  console.log("ipfs error:",err)
})
