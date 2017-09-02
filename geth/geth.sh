#!/bin/bash
#TO UNLOCK: personal.unlockAccount(eth.accounts[0])
geth --syncmode=fast --rpc --rpcapi="db,eth,net,web3,personal" console
