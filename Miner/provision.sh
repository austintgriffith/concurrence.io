#!/bin/bash
echo ".....Preparing OS........................."
cd ~
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
git config --global push.default simple
sudo apt-get update
sudo apt-get dist-upgrade -y
sudo apt-get upgrade -y
sudo apt-get install build-essential -y
sudo apt-get install python -y

echo ".....Installing Node........................."
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v

echo ".....Installing ipfs........................."
wget https://dist.ipfs.io/go-ipfs/v0.4.9/go-ipfs_v0.4.9_linux-386.tar.gz
tar xvf go-ipfs_v0.4.9_linux-386.tar.gz
cd go-ipfs
sudo ./install.sh
ipfs version
cd ..

echo ".....Installing geth........................."
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum -y
geth version

echo "....Installing RQC........................."
cd ~/rqc/Miner
npm install
npm install leveldown
node ipfsget.js


echo "....Installing SOLC........................."
npm init
npm install --save solc
node compile.js Auth
