#!/bin/bash
#TO UNLOCK: personal.unlockAccount(eth.accounts[0])
geth --testnet --datadir "/home/ubuntu/.ethereum/testnet" --syncmode=fast --rpc --rpcapi="db,eth,net,web3,personal"
