---
title: "Utility Token"
date: 2017-09-21T17:47:15-06:00
draft: true
---
The first thing to address in building a decentralized oracle network is the cryptoeconomics of incentivizing miners. To do this we will create a utility token that can be used to purchase the efforts of request miners. Any given channel of data will need a consensus and to drive that consensus, an amount of token will be put up for grabs. As miners reach a consensus on the blockchain they will be rewarded with the token.

Thankfully, many brilliant minds have come together to build a safe and standardized token for Ethereum. One such token is the  [HumanStandardToken](https://github.com/ConsenSys/Tokens/blob/master/contracts/HumanStandardToken.sol), and this could be extended for the use as a **RequstCoin**.

```
string public constant symbol = "RQC";
string public constant name = "RequestCoin";
uint8 public constant decimals = 18;
uint256 _totalSupply = 1000000000;
```

```
// https://github.com/ethereum/EIPs/issues/20
contract ERC20 {
  function totalSupply() constant returns (uint totalSupply);
  function balanceOf(address _owner) constant returns (uint balance);
  function transfer(address _to, uint _value) returns (bool success);
  function transferFrom(address _from, address _to, uint _value) returns (bool success);
  function approve(address _spender, uint _value) returns (bool success);
  function allowance(address _owner, address _spender) constant returns (uint remaining);
  event Transfer(address indexed _from, address indexed _to, uint _value);
  event Approval(address indexed _owner, address indexed _spender, uint _value);
}
```

On top of this tried-and-true token standard we will need a few other features. First, we will need a mechanism for users to *reserve* funds for the mining of a particular internet endpoint. Second, we will need a way for miners to *stake* some of their own token for or against the consensus. Finally, we will want to have a reserved percentage of Ether stored in the contract to provide *liquidity* to the token at some price floor.

