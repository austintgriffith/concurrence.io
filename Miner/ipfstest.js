const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')
const ipfs = new IPFS({EXPERIMENTAL:{pubsub: true}})

//npm install --save ipfs
// (ran that twice)
//then: npm install --save async
// Create the IPFS node instance



const topic = 'SOMETOPIC'

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
/*
  const receiveMsg = (msg) => {
    console.log("MSG:",msg)
    console.log(msg.data.toString())
  }

  ipfs.pubsub.subscribe(topic, receiveMsg)
*/
})



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


setInterval(()=>{
  ipfs.pubsub.peers(topic, (err, peerIds) => {
    if (err) {
      throw err
    }
    console.log(peerIds)
  })
},3000)
*/

setInterval(()=>{
  ipfs.swarm.peers(function (err, peerInfos) {
    if (err) {
      throw err
    }
    console.log("SWARM",peerInfos.length)
  })
},4000)


/*
// stopping a node
node.stop(() => {
  // node is now 'offline'
  console.log("Stopped.")
})
*/
