const fs = require('fs');
const solc = require('solc');
console.log("Compiling "+process.argv[2]+".sol ...")
const input = fs.readFileSync(process.argv[2]+'.sol');
if(!input){
  console.log("Couldn't load "+process.argv[2]+".sol")
}else{
  var sources = {
    'Auth.sol': fs.readFileSync('../Auth/Auth.sol', 'utf8'),
    'Main.sol': fs.readFileSync('../Main/Main.sol', 'utf8'),
    'Freezable.sol': fs.readFileSync('../Freezable/Freezable.sol', 'utf8'),
    'Descendant.sol': fs.readFileSync('../Descendant/Descendant.sol', 'utf8'),
    'Token.sol': fs.readFileSync('../Token/Token.sol', 'utf8'),
  };
  sources[(process.argv[2])+".sol"] = fs.readFileSync((process.argv[2])+".sol", 'utf8');
  const output = solc.compile({sources: sources}, 1);
  console.log(output)
  const bytecode = output.contracts[process.argv[2]+".sol:"+process.argv[2]].bytecode;
  const abi = output.contracts[process.argv[2]+".sol:"+process.argv[2]].interface;
  fs.writeFile(process.argv[2]+".bytecode",bytecode)
  fs.writeFile(process.argv[2]+".abi",abi)
  console.log("Compiled!")
}
