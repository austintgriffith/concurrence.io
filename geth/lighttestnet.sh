#!/bin/bash
#TO UNLOCK: personal.unlockAccount(eth.accounts[0])
geth --testnet --syncmode=light --datadir "~/.rqceth" --rpc --rpcapi="db,eth,net,web3,personal" console
