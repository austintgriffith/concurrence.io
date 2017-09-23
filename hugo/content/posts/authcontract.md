---
title: "Auth Contract"
date: 2017-09-23T17:06:17-06:00
draft: true
---
The first and least complex contract is the **Auth** contract. **Auth** keeps a **permission** *(uint8)* for any **account** *(address)*. Other contracts can use this contract to determine the level of **permission** any **account** has by calling **getPermission(*address*)**. Any account with enough **permission** *(uint8)* can also call **setPermission(*address*,*permission*)**.

```javascript
///Auth/Auth.sol CODE NEEDS TO AUTO POPULATE HERE//
```
