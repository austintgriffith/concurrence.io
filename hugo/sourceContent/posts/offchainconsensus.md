---
title: "Off-chain Consensus"
date: 2017-09-21T18:15:34-06:00
draft: true
---

A purely on-chain solution to the decentralized oracle problem faces a big hurdle due to gas prices when reaching a consensus. If every miner has to post results to the blockchain, they will spend way more gas than economically viable. Plus, other miners could simply echo what previous miners posted and earn the token reward without actually making the request. **It is at least worth mentioning that it would be a lot cheaper (gas) to simply trigger an on-chain event without storing anything, but an off-chain solution is still probably better.**

To solve this problem we'll use an emerging technology called [IPFS](https://ipfs.io/). In particular, we will use their [pubsub](https://ipfs.io/blog/25-pubsub/) functionality.

To solve the problem of copy-cat miners, each miner will first post a hash of what they think the content value should be. Once enough miners come to the same conclusion, this hash will be written to the blockchain and the token will be used as stake. Finally, after a consensus of the hash of the content is statistically reached, the content itself can be revealed and hosted in IPFS.

Eventually, [Filecoin](https://filecoin.io/) will incentivize the storage of said content in IPFS so RequstCoin will also act as a bridge between the old and new internet. For example, if an entity wanted to move all of their content from the traditional internet into IPFS, they could spend RequestCoin to pay miners to download and store the content in IPFS and then spend [Filecoin](https://filecoin.io/) to keep that content hosted and replicated in a peer-to-peer fashion.
