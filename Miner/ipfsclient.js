const IPFS = require('ipfs')

//54.208.27.159

const ipfs = new IPFS(
  {
    EXPERIMENTAL:{
      pubsub: true
    },
    config: { // overload the default IPFS node config
      Bootstrap: [
        //a couple custom ports should probably be opened up on rqc somewhere
        //just to give a network that blocks 4001 a proxy to ipfs
        "/ip4/54.208.27.159/tcp/8000/ipfs/QmakdM7XPy9kYpXvEo9GduDvKazx8PuTvCSYoVyPtpCmqE",
        //the reset of the defaul list that requires port 4001 to be open
        "/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",  // mars.i.ipfs.io
        "/ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z",  // neptune (to be neptune.i.ipfs.io)
        "/ip4/104.236.179.241/tcp/4001/ipfs/QmSoLpPVmHKQ4XTPdz8tjDFgdeRFkpV8JgYq8JVJ69RrZm", // pluto (to be pluto.i.ipfs.io)
        "/ip4/162.243.248.213/tcp/4001/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm", // uranus (to be uranus.i.ipfs.io)
        "/ip4/128.199.219.111/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu", // saturn (to be saturn.i.ipfs.io)
        "/ip4/104.236.76.40/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64",   // venus (to be venus.i.ipfs.io)
        "/ip4/178.62.158.247/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",  // earth (to be earth.i.ipfs.io)
        "/ip4/178.62.61.185/tcp/4001/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3",   // mercury (to be mercury.i.ipfs.io)
        "/ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx", // jupiter (to be jupiter.i.ipfs.io)
      ]
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
      /*
      console.log("GET")
      ipfs.files.get(multihashStr, function (err, stream) {
        stream.on('data', (file) => {
          console.log("GOT")
          // write the file's path and contents to standard out
          console.log(file.path)
          file.content.pipe(process.stdout)
        })
      })
      */
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
      const msg = new Buffer('bananas!')
      setInterval(()=>{
        ipfs.pubsub.publish(topic,msg, (err, peerIds) => {
          if (err) {
            throw err
          }
          console.log("BCSTED")
        })
      },11000)
    }
  })
},4000)
