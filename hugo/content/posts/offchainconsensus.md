---
title: "Off-chain Consensus"
date: 2017-09-21T18:15:34-06:00
draft: true
---

A purely on-chain solution to the decentralized oracle problem faces a big hurdle due to gas prices of reaching a consensus. If every single miner has to post result to the block chain, they will spend way more gas than economically viable. Plus, other miners could simple echo what previous miners posted and earn the token without actually making the request.

To solve this problem we'll use an emerging technology called [IPFS](https://ipfs.io/). In particular, we will use their [pubsub](https://ipfs.io/blog/25-pubsub/) functionality.

To solve the problem of copy-cat miners, each miner will first post a hash of what they thing the content is. Once enough miners come to the same conclusion, this hash will be written to the blockchain and the token will be used as stake. Finally, after a consensus of the hash of the content is statistically reached, the content itself can be revealed and hosted in IPFS.
