---
title: "Crafting Scripts"
date: 2017-09-23T14:10:00-06:00
draft: true
---
Before we can compile and deploy our fleet of smart contracts, we'll need to build a handful of useful scripts. They will also require a couple dependancies:

```bash
npm install solc web3
```

Let's set up a few global variables:
```bash
echo "20" > gasprice.int
echo "280" > ethprice.int
echo "2000000" > deploygas.int
echo "200000" > xfergas.int
```

lib.js
------------------
*brings in global variables and prepares helper functions and dependancies*

```javascript
//lib.js CODE NEEDS TO AUTO POPULATE HERE//
```



personal.js
------------------
*reports current account balances and unlock accounts*

```javascript
//personal.js CODE NEEDS TO AUTO POPULATE HERE//
```


send.js
------------------
*sends ether from one account to another*

```javascript
//send.js CODE NEEDS TO AUTO POPULATE HERE//
```

compile.js
------------------
*compiles a contract*

```javascript
//compile.js CODE NEEDS TO AUTO POPULATE HERE//
```

deploy.js
------------------
*deploys a contract*

```javascript
//deploy.js CODE NEEDS TO AUTO POPULATE HERE//
```

contract.js
------------------
*provides other scripts an interface to contracts through abstraction*

```javascript
//contract.js CODE NEEDS TO AUTO POPULATE HERE//
```
