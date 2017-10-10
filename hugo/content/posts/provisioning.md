---
title: "Provisioning"
date: 2017-09-22T11:02:45-06:00
draft: true
---

This exploration should start from the ground up. We want anyone to be able to spin up a vanilla linux machine and build out an entire miner from scratch. We also want to explore basic Ethereum network interactions from the transferring of funds to simple contracts and eventually more advanced contract mechanics. If you understand these already and want to get down to the brass tacks of the system, skip ahead to the [deployed contracts section](/posts/requestcoinfleet/).

Starting from a default Ubuntu AMI in AWS:

![provisioning_aws](http://s3.amazonaws.com/rqcassets/provisioning_aws.png)

SSH into the machine and run all the necessary updates:
```bash
sudo apt-get update
sudo apt-get dist-upgrade -y
sudo apt-get upgrade -y
```

Install build tools:
```bash
sudo apt-get install build-essential -y
sudo apt-get install python -y
```

Install Node.js:
```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install Geth:
```bash
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum -y
```

Fire up Geth and connect to the Ethereum test network.
```bash
geth --testnet \
  --datadir "~/.rqc" \
  --syncmode=fast \
  --rpc \
  --rpcapi="db,eth,net,web3,personal"
```
(note: make sure port 8545 is blocked to the public in your AWS security group)

Geth will start syncing with the blockchain:
![provisioning_geth_sync](http://s3.amazonaws.com/rqcassets/rqc_provisioning-gethsync.png)

It will take more than an hour, but when you are up-to-date it will sync single blocks at a time:
![rqc_provision_singleblockatatime](http://s3.amazonaws.com/rqcassets/rqc_provision_singleblockatatime.png)

You can also visit <a href="https://ropsten.etherscan.io" target="_blank">https://ropsten.etherscan.io</a> to see what the latest block is.

