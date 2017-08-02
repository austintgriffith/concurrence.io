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

Fire up the mock backend server
```
cd Web
sudo nodemon index.js
(http://localhost/address returns the main address)
```

Bring up the client with
```
cd App
npm start
```
