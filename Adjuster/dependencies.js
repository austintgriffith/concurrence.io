const fs = require('fs');
module.exports = {
  'Simple.sol': fs.readFileSync('Simple/Simple.sol', 'utf8')
}
