const IPFS = require('ipfs')
//npm install --save ipfs
// (ran that twice)
//then: npm install --save async
// Create the IPFS node instance
const ipfs = new IPFS({EXPERIMENTAL:{pubsub: true}})


const topic = 'SOMETOPICTHATISHARDTOGUESSIGUESSIDK'

console.log("Starting.")
ipfs.on('ready', () => {
  // Your node is now ready to use \o/
  console.log("Ready.")

  const receiveMsg = (msg) => {
    console.log("MSG:",msg)
    console.log(msg.data.toString())
  }

  ipfs.pubsub.subscribe(topic, receiveMsg)

})

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
