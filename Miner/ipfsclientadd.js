const IPFS = require('ipfs')
const fs = require('fs')


const ipfs = new IPFS(
  {
    EXPERIMENTAL:{
      pubsub: true
    },
    config: { // overload the default IPFS node config
      Bootstrap: [
        "/ip4/54.208.27.159/tcp/8000/ipfs/QmakdM7XPy9kYpXvEo9GduDvKazx8PuTvCSYoVyPtpCmqE",
      ]
    },
  }
)

ipfs.on('ready', () => {
  console.log("Ready?")
  ipfs.id(function (err, identity) {
    if (err) {
      throw err
    }
    console.log(identity)
    console.log("ISON",ipfs.isOnline())
  })
})

const files = [
  {
    path: 'test.txt',
    content: fs.readFileSync('test.txt')
  }
]

let didAdd = false
setInterval(()=>{
  ipfs.swarm.peers(function (err, peerInfos) {
    if (err) {
      throw err
    }
    console.log("SWARM",peerInfos.length)
    if(!didAdd && peerInfos.length>0){
      didAdd=true
      console.log("ADD")
      ipfs.files.add(files, function (err, files) {
        // 'files' will be an array of objects
        console.log("ADDED",err,files)
      })
    }
  })
},4000)
