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
<!--
lib.js
------------------
*brings in global variables and prepares helper functions and dependancies*
-->



personal.js
------------------
*reports current account balances and unlocks accounts*

<!--RQC CODE javascript personal.js -->


send.js
------------------
*sends ether from one account to another*

<!--RQC CODE javascript send.js -->

compile.js
------------------
*compiles a contract*

<!--RQC CODE javascript compile.js -->

deploy.js
------------------
*deploys a contract*

<!--RQC CODE javascript deploy.js -->

contract.js
------------------
*provides other scripts with an interface to contracts through abstraction*

<!--RQC CODE javascript contract.js -->
