const fs = require('fs');
module.exports = {
  'Auth.sol': fs.readFileSync('Auth/Auth.sol', 'utf8')
}
