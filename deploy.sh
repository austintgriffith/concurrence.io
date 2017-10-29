#!/bin/bash


set -x
node accounts
mainAccount=1
secondaryAccount=2
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Loading Accounts...";
mainAccountAddress=$(cat accounts.json | jq ".[$mainAccount]" | sed "s/^\([\"']\)\(.*\)\1\$/\2/g" )
secondaryAccountAddress=$(cat accounts.json | jq ".[$secondaryAccount]" | sed "s/^\([\"']\)\(.*\)\1\$/\2/g" )
echo "mainAccountAddress:$mainAccountAddress"
echo "secondaryAccountAddress:$secondaryAccountAddress"
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"


echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Deploying Auth...";
node compile Auth;
node deploy Auth;
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"

echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Giving account [$secondaryAccount] ($secondaryAccountAddress) permission from account [$mainAccount]...";
node contract setPermission Auth null $mainAccount $secondaryAccountAddress setPermission true
node contract setPermission Auth null $mainAccount $secondaryAccountAddress setContract true
node contract getPermission Auth null $mainAccountAddress "setPermission"
node contract getPermission Auth null $mainAccountAddress "setContract"
node contract getPermission Auth null $secondaryAccountAddress "setPermission"
node contract getPermission Auth null $secondaryAccountAddress "setContract"
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"

echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Deploying Main..."
node compile Main
node deploy Main
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"

echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Interacting with Main..."
node contract getContract Main null "Auth"
node contract setContactInformation Main null 1 "http://concurrence.io"
node contract getContactInformation Main
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Deploying Token..."
node compile Token
node deploy Token
node contract setContract Main null 1 Token $(cat Token/Token.address)
#node contract setContract Main null 1 Token (cat Token/Token.address)
node contract setContactInformation Token null 1 "http://concurrence.io"
node contract getContactInformation Token
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Deploying Requests..."
node compile Requests
node deploy Requests
node contract setContract Main null 1 Requests $(cat Requests/Requests.address)
#node contract setContract Main null 1 Requests (cat Requests/Requests.address)
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"

echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Deploying Responses..."
node compile Responses
node deploy Responses
node contract setContract Main null 1 Responses $(cat Responses/Responses.address)
#node contract setContract Main null 1 Responses (cat Responses/Responses.address)
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"

echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Deploying basic Combiner..."
node compile Combiner/basic Combiner
node deploy Combiner/basic Combiner
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
