#!/bin/bash
#TO UNLOCK: personal.unlockAccount(eth.accounts[0])
/usr/bin/geth --testnet \
  --datadir "/home/ubuntu/.rqc" \
  --syncmode=fast \
  --rpc \
  --rpcapi="db,eth,net,web3,personal"
