const IPFS = require('ipfs')

/*
let config = {
  "Bootstrap": [
    "/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
    "/ip4/162.243.248.213/tcp/4001/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm",
    "/ip4/25.196.147.100/tcp/4001/ipfs/QmaMqSwWShsPg2RbredZtoneFjXhim7AQkqbLxib45Lx4S",
  ],
}*/




//const Room = require('ipfs-pubsub-room')
const ipfs = new IPFS(
  {
    EXPERIMENTAL:{
      pubsub: true
    }
  }
)

//npm install --save ipfs
// (ran that twice)
//then: npm install --save async
// Create the IPFS node instance


const multihashStr = 'QmQNt89HCVNaGwUhJFASdAv7eqrGmTPLyNWTDgEVzdFhP9'

console.log("Starting.")

ipfs.bootstrap.list((err,list)=>{
  console.log("LIST",list)
})

ipfs.on('ready', () => {
  console.log("Ready?")

  ipfs.id(function (err, identity) {
  if (err) {
    throw err
  }
  console.log(identity)
})
})



const topic = 'SOMETOPIC'
/*
console.log("Starting.")
ipfs.on('ready', () => {
  ipfs.id((err,id)=>{
      console.log(id)
  })
  // Your node is now ready to use \o/
  console.log("Ready.")
  console.log("Connecting to room....")
  const room = Room(ipfs,topic)
  room.on('message', (message) => {
    console.log(topic+" MESSAGE FROM "+message.from+": "+message.data.toString())

  })
  setInterval(()=>{
    room.broadcast("HELLO JABRONIES")
  },2000)

})
*/


/*
setInterval(()=>{
  const msg = new Buffer('JimmyLegs!')
  console.log("Publishing...")
  ipfs.pubsub.publish(topic, msg, (err) => {
    if (err) {
      throw err
    }
    // msg was broadcasted
  })
},10000)

*/
setInterval(()=>{
  ipfs.pubsub.peers(topic, (err, peerIds) => {
    if (err) {
      throw err
    }
    console.log(peerIds)
  })
},3000)






let didGet = false
setInterval(()=>{
  ipfs.swarm.peers(function (err, peerInfos) {
    if (err) {
      throw err
    }
    console.log("SWARM",peerInfos.length)
    if(!didGet && peerInfos.length>0){
      didGet=true
      console.log("GET")
      ipfs.files.get(multihashStr, function (err, stream) {
        stream.on('data', (file) => {
          console.log("GOT")
          // write the file's path and contents to standard out
          console.log(file.path)
          file.content.pipe(process.stdout)
        })
      })
    }
  })
},4000)


/*
// stopping a node
node.stop(() => {
  // node is now 'offline'
  console.log("Stopped.")
})
*/
