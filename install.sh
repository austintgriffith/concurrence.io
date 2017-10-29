#!/bin/bash
npm install
git clone https://github.com/OpenZeppelin/zeppelin-solidity.git
git clone https://github.com/austintgriffith/concurrence.js.git
git clone https://github.com/austintgriffith/concurrence.io-site.git
npm install pm2 -g

git clone https://github.com/settlemint/EthExplorer.git;cd EthExplorer/;npm install;npm start
