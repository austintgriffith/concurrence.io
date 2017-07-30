#!/bin/bash
#TO UNLOCK: personal.unlockAccount(eth.accounts[0])
geth --testnet --rpc --rpcapi="db,eth,net,web3,personal" console
