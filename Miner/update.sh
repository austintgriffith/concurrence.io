#!/bin/bash
echo ".....Update OS........................."
sudo apt-get update
sudo apt-get dist-upgrade -y
sudo apt-get upgrade -y

echo ".....Update Geth........................."
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
