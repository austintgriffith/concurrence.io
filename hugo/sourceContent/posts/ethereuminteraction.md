---
title: "Ethereum Network Interaction"
date: 2017-09-23T10:12:22-06:00
---
Let's interact with the Ethereum network.

With Geth running and up-to-date, we can attach to it from another ssh session.

```bash
geth attach http://:8545
```

A fresh installation of Geth will have an empty array of accounts.

```bash
eth.accounts
```

![rqc_eth_interact_attach](http://s3.amazonaws.com/rqcassets/rqc_eth_interact_attach.png)

Create a couple Ethereum test accounts:

```bash
web3.personal.newAccount()
```

![rqc_eth_interact_create_accounts](http://s3.amazonaws.com/rqcassets/rqc_eth_interact_create_accounts.png)

Check the balance of an account with
```bash
eth.getBalance()
```

![rqc_eth_interact_balance](http://s3.amazonaws.com/rqcassets/rqc_eth_interact_balance.png)


Let's ask a testnet faucet for a little test ether:
```bash
curl -X POST  \
  -H "Content-Type: application/json" \
  -d "{\"toWhom\":\"0x14f990ce8f5124f273bdc19b8a39769eab8736a3\"}" \
  https://ropsten.faucet.b9lab.com/tap
```

The faucet will return a transaction id and we can look it up using
<a href="https://ropsten.etherscan.io/tx/0x0dfd0f77f55c48313acff83284f4d97505e598273791c6de95761e386a0caef2" target="_blank">etherscan.io</a>:

![rqc_eth_inter_ropsten_faucet](http://s3.amazonaws.com/rqcassets/rqc_eth_inter_ropsten_faucet.png)

After the transaction clears we will have some test ether:

![rqc_eth_interact_balancewitheth](http://s3.amazonaws.com/rqcassets/rqc_eth_interact_balancewitheth.png)

Next, let's send some test ether to the second account:

```bash
eth.sendTransaction(
  {
    from:"0x14f990ce8f5124f273bdc19b8a39769eab8736a3",
    to:"0x6230323b97fb5504e2d352d5dd07c798a8ecbe91",
    value:1000000000000
  }
)
```

(We also have to unlock the account)
![rqc_eth_interact_transfer](http://s3.amazonaws.com/rqcassets/rqc_eth_interact_transfer.png)

We can follow the transaction on <a href="https://ropsten.etherscan.io/tx/0x301f949ba0304b750f339dad5cdf93c366e539bca42664348871e309fa8d654b" target="_blank">etherscan.io</a>:
![rqc_eth_interact_tx](http://s3.amazonaws.com/rqcassets/rqc_eth_interact_tx.png)
