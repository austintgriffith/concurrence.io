#!/bin/bash
echo "Deploying Auth...";
cd Auth;node compile Auth;node deploy Auth;
cd ..

echo "Deploying Main...";
cd Main;node compile Main;node deploy Main;
cd ..

echo "Deploying Requests...";
cd Requests;node compile Requests;node deploy Requests;
cd ..

echo "Deploying Token...";
cd Token;node compile Token;node deploy Token;
cd ..
