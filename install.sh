#!/bin/bash
npm install
git clone https://github.com/OpenZeppelin/zeppelin-solidity.git
git clone https://github.com/austintgriffith/concurrence.js.git
git clone https://github.com/austintgriffith/concurrence.io-site.git
npm install pm2 -g

git clone https://github.com/etherparty/explorer.git;cd explorer;npm install;npm start
