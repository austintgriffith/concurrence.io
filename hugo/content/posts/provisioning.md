---
title: "Provisioning"
date: 2017-09-22T11:02:45-06:00
draft: true
---

This exploration should start from the ground up.
The first thing we have to do is get a machine up and running.
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

Geth will start syncing with the blockchain:
![provisioning_geth_sync](http://s3.amazonaws.com/rqcassets/rqc_provisioning-gethsync.png)

It will take more than an hour, but when you are up-to-date it sync single blocks at a time:
![rqc_provision_singleblockatatime](http://s3.amazonaws.com/rqcassets/rqc_provision_singleblockatatime.png)

You can also visit <a href="https://ropsten.etherscan.io" target="_blank">https://ropsten.etherscan.io</a> to see what the latest block is. 
