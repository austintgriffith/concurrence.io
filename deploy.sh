#!/bin/bash
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Deploying Auth...";
node compile Auth;
node deploy Auth;
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"

echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Giving account [1] permission from account [0]...";
cd Auth
node givePermission Auth
node get Auth
cd ..
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"

echo "Deploying Main..."
node compile Main
node deploy Main
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"


echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Deploying Requests..."
node compile Requests
node deploy Requests
node contract wireupContract Main null Requests 10
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"


echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Deploying Token..."
node compile Token
node deploy Token
node contract wireupContract Main null Token 20
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"



echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Check that everything is wired up..."
node personal.js
cd Main
node get.js Main
cd ..
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"


echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Transfer some coin to the second account..."
cd Token
node transfer Token
node balances Token
cd ..
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"




echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Deploying basic Combiner..."
node compile Combiner/basic Combiner
node deploy Combiner/basic Combiner
node contract wireupContract Main null Combiner/basic Combiner 100
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"




echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Add an open request from the second account ..."
cd Requests
node index Requests
cd ..
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"


echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "View Token event of request add ..."
cd Token
node eventsReserve Token
cd ..
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"

echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "View Request event of request add ..."
cd Requests
node eventsAddRequest Requests
cd ..
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"


echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "Mine Request as account[1]..."
cd Requests
node mine Requests
cd ..
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"


echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "View mine event..."
cd Combiner/basic
node eventsAddResponse Combiner
cd ../..
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"


echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
echo "View balances after mining..."
cd Token
node balances Token
cd ..
echo "-=======-=======-=======-=======-=======-=======-=======-=======-------"
