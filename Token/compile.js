const fs = require('fs');
const solc = require('solc');
console.log("Compiling "+process.argv[2]+".sol ...")
const input = fs.readFileSync(process.argv[2]+'.sol');
if(!input){
  console.log("Couldn't load "+process.argv[2]+".sol")
}else{
  const output = solc.compile(input.toString(), 1);

  console.log(output)

  const bytecode = output.contracts[':'+process.argv[2]].bytecode;
  const abi = output.contracts[":"+process.argv[2]].interface;
  fs.writeFile(process.argv[2]+".bytecode",bytecode)
  fs.writeFile(process.argv[2]+".abi",abi)
  console.log("Compiled!")
}
