---
title: "Utility Token"
date: 2017-09-21T17:47:15-06:00
draft: true
---
The first thing to address in building a decentralized oracle network is the cryptoeconomics of incentivizing miners. To do this we will create a utility token that can be used to purchase the efforts of request miners. Any given channel of data will need a consensus and to drive that consensus, an amount of token will be put up for grabs. As miners reach a consensus on the blockchain they will be rewarded with the utility token.

At the time of writing this, the best option for a token contract is the [HumanStandardToken](https://github.com/ConsenSys/Tokens/blob/master/contracts/HumanStandardToken.sol).

```javascript
string public constant symbol = "RQC";
string public constant name = "RequestCoin";
uint8 public constant decimals = 18;
uint256 _totalSupply = 1000000000;
```

On top of this tried-and-true token standard we will need a few other features. First, we will need a mechanism for users to fund the mining of a particular internet endpoint. Second, we will need a way for miners to "stake" some of their own token against the consensus. Finally, we will want to have a reserve of Ether stored in the contract to provide liquidity to the token at some price floor. 
