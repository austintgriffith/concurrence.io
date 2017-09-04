const IPFS = require('ipfs')
//npm install --save ipfs
// (ran that twice)
//then: npm install --save async
// Create the IPFS node instance
const ipfs = new IPFS({EXPERIMENTAL:{pubsub: true}})

console.log("Starting.")
ipfs.on('ready', () => {
  // Your node is now ready to use \o/
  console.log("Ready.")

  const topic = 'fruit-of-the-day'
  const msg = new Buffer('bananas!')

  ipfs.pubsub.publish(topic, msg, (err) => {
    if (err) {
      throw err
    }
    // msg was broadcasted
  })

})


/*
// stopping a node
node.stop(() => {
  // node is now 'offline'
  console.log("Stopped.")
})
*/
