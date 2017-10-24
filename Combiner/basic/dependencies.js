const fs = require('fs');
module.exports = {
  'Addressed.sol': fs.readFileSync('Addressed/Addressed.sol', 'utf8')
}
