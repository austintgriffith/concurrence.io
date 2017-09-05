const IPFS = require('ipfs')
const ipfs = new IPFS(
  {
    EXPERIMENTAL:{
      pubsub: true
    }
  }
)
console.log("init")
ipfs.repo.init((err,data)=>{
  console.log("INIT",err,data);
})
