---
title: "Contract Lineage"
date: 2017-09-21T19:55:57-06:00
draft: true
---
Writing and deploying a contract on the Ethereum blockchain is relatively easy, but writing and deploying safe and secure contracts is extremely difficult. Inevitably, code will need to be upgraded as vulnerabilities are exposed and new functionality is needed.

The best strategies to provide upgradability to contracts is using many different, interconnected contracts that each have a simple job within a larger system. For example, one contract will be used to store requests and another will manipulate them. This allows for new functionality to be added to the manipulator while keeping the datastore intact. Having to upgrade a datastore contract would mean that after the replacement contract is deployed there is an expensive period of time where all data has to be migrated.

Along with this "microservice" architecture, contracts will need to have lineage. As off-chain code interacts with contracts, they will follow a tree of ancestry to the most current descendant. At any moment, a contract will "die" and a successor will be "born". We might also be frozen in a "lame duck" state during which information from the predecessor is transferred to the new contract.

As the fleet of contacts harden and functionality solidifies, certain safety measures and kill switches will be removed. This provides more long term trust because a single account will no longer be able to dictate how others can interact with the contracts.
