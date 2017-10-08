---
title: "Auth Contract"
date: 2017-09-23T17:06:17-06:00
draft: true
---
**Auth** keeps a **permission** *(uint8)* for any **account** *(address)*. Other contracts can use this contract to determine the level of **permission** any **account** has by calling **getPermission(*address*)**. Any account with enough **permission** *(uint8)* can also call **setPermission(*address*,*permission*)**.

<!--RQC CODE solidity Auth/Auth.sol -->

Eventually, the **Auth** contract will be extended to allow for more complex governance including voting and signally for specific changes to the system.
