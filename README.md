#RQC

Start a test rpc
```
testrpc
```

Deploy contracts to rpc
```
./deploy.sh
```

Wire the deployed contracts back to the main
```
cd Main
node wireupAllContracts.js Main
node get.js Main
```

Fire up the mock requestcoin.io backend server
```
cd Web
sudo nodemon index.js
```
