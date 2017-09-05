const IPFS = require('ipfs')

//54.208.27.159

const ipfs = new IPFS(
  {
    EXPERIMENTAL:{
      pubsub: true
    },
    config: { // overload the default IPFS node config
    Addresses: {
        Swarm: [
          "/ip4/0.0.0.0/tcp/8000",
          "/ip4/54.208.27.159/tcp/8000",
        ]
      }
    },
  }
)


const topic = 'fruit-of-the-day'




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

const multihashStr = 'QmVLDAhCY3X9P2uRudKAryuQFPM5zqA3Yij1dY8FpGbL7T/about';
let didGet = false
setInterval(()=>{
  ipfs.swarm.peers(function (err, peerInfos) {
    if (err) {
      throw err
    }
    console.log("SWARM",peerInfos.length)
    if(!didGet && peerInfos.length>0){
      didGet=true
      /*console.log("GET")
      ipfs.files.get(multihashStr, function (err, stream) {
        stream.on('data', (file) => {
          console.log("GOT")
          // write the file's path and contents to standard out
          console.log(file.path)
          file.content.pipe(process.stdout)
        })
      })*/
      console.log("SUB")


      const receiveMsg = (msg) => {
        console.log("MSG",msg,msg.data.toString())
      }

      ipfs.pubsub.subscribe(topic, receiveMsg)

      setInterval(()=>{
        ipfs.pubsub.peers(topic, (err, peerIds) => {
          if (err) {
            throw err
          }
          console.log("PUBSUB PEERS",peerIds)
        })
      },5000)

    }
  })
},4000)
